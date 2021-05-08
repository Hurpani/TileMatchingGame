import { GameState, Effect, GameObject, Vec2, C } from "./tetris"
import { ObjectBag, pixelPosToCoords, SVGObject, SVGRectangle } from "./graphics";
import { Sprite } from "./tetris";
import { range } from "./base/functional";
import { Maybe } from "./base/maybe";

function output(backing: HTMLElement): ((_: GameState) => void) {
    return (
        (state: GameState) => {
            state.effects.forEach(e => e.do(backing));
            const UI_TILE_MAX_HEIGHT: number = C.PIXEL_VERTICAL_OFFSET / 2;
            const MAX_DIM = 3; // 3 x 3 Tetrominoes.
            const count: number = state.nextTetrominoes.underlying.length;
            const ids: Array<number> = range(C.UI_ID_OFFSET - count)(C.UI_ID_OFFSET);
            const size: number = Math.min(UI_TILE_MAX_HEIGHT, C.PIXEL_WIDTH / count) / MAX_DIM;
            /* Upper menu display. */
            const bags: Array<ObjectBag> = ids.map(i => {
                const got: Maybe<ObjectBag> = ObjectBag.getObjectBag(i);
                return got.isJust ? got.fromJust() : new ObjectBag(i, pixelPosToCoords(new Vec2((C.UI_ID_OFFSET - i - 0.5) * size * MAX_DIM, UI_TILE_MAX_HEIGHT + ((MAX_DIM * size) / 2) - (size / 2))), []);
            });
            bags.forEach(bag => {
                bag.getLiveObjects().forEach(o => o.destroy());
            });
            for(let i: number = 0; i < count; i ++) {
                const maybeSprite: Maybe<Sprite> = state.nextTetrominoes.get(i);
                bags[i].addObjects(maybeSprite.isJust ? generateSprite(maybeSprite.fromJust(), bags[i].getPosition(), backing, size/2, size/2) : []);
            }
            document.getElementById(C.SCORE_TEXT_ID).textContent = `${C.SCORE_PREFIX}${state.score}`;
            document.getElementById(C.LEVEL_TEXT_ID).textContent = `${C.LEVEL_PREFIX}${state.level}`;
            const notificationElement: HTMLElement = document.getElementById(C.NOTIFICATION_TEXT_ID); 
            document.getElementById(C.NOTIFICATION_TEXT_ID).textContent = state.gameOver ? C.NOTIFICATION_GAME_OVER : (state.paused ? C.NOTIFICATION_PAUSED : "");
            backing.appendChild(notificationElement);
        }
    );
}

function generateSprite(spr: Sprite, position: Vec2, backing: HTMLElement, width: number = C.TILE_WIDTH, height: number = C.TILE_HEIGHT): Array<SVGObject> {
    return spr.occupies.map(v => new Vec2(v.x * (width / C.TILE_WIDTH), v.y * (height / C.TILE_HEIGHT))).map(
                v => new SVGRectangle(
                        backing,
                        v.add(position),
                        width,
                        height,
                        spr.colour
                    )
            ); 
}

/* Releases unused associated ObjectBags, and regenerates sprites for those which are in use. */
class RefreshDrawObjects implements Effect {
    public constructor(private readonly objs: ReadonlyArray<GameObject>) {}
    public do(backing: HTMLElement) {
        this.objs.forEach(obj => {
            ObjectBag.getObjectBag(obj.id).fmap(
                bg => {
                    bg.getLiveObjects().forEach(o => o.destroy());
                    if (obj.sprite.occupies.length > 0) {
                        bg.addObjects(generateSprite(obj.sprite, obj.position, backing, C.TILE_WIDTH, C.TILE_HEIGHT));
                    } else {
                        ObjectBag.forgetObjectBag(obj.id);
                    }
                }
            );
        })
    }
}

class Instantiate implements Effect {
    public constructor(private readonly obj: GameObject) {}
    public do(backing: HTMLElement) {
        const components: Array<SVGObject> = generateSprite(this.obj.sprite, this.obj.position, backing, C.TILE_WIDTH, C.TILE_HEIGHT);
        new ObjectBag(this.obj.id, this.obj.position, components);
    }
}

class MoveEffect implements Effect {
    public constructor(public readonly obj: GameObject, public readonly pos: Vec2) {}
    public do(_: HTMLElement) {
        ObjectBag.getObjectBag(this.obj.id).fmap(
            o => o.setPosition(this.pos)
        );
    }
}

class TransformEffect implements Effect {
    public constructor(public readonly obj: GameObject, public readonly transformer: ((_:Vec2) => Vec2)) {}
    public do(_: HTMLElement) {
        ObjectBag.getObjectBag(this.obj.id).fmap(
            o => o.transform(this.transformer)
        );
    }
}

export { output, Instantiate, MoveEffect, TransformEffect, RefreshDrawObjects }