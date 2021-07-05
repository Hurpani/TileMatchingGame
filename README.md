# Tile-matching Browser Game
You can try the game out for yourself by downloading the build and game directories, and opening
tetris.html.

# Tetris : Multi-paradigm Approach
## Functional-Reactive Programming / Object-Oriented Programming.
The core part of the Tetris game. In this file, effectful code is minimised - it intentionally
exists in a pair of places: the "subscribe" call for the game$ stream, and the initial value for
scan on that same stream (where we choose a seed for pseudo-random number generation). Of course,
the creation and performance of the streams themselves are effects, too.
The game state is managed through deeply-immutable structures^. The state "changes", then, by
the streaming of "Actions" and accumulation of "Effects".

^These fit the type given by GameState.

    * Actions *
    
    An Action is a class which accepts an input GameState, and returns a new GameState.
    Actions are how the game's state is "changed" internally. Amongst the attributes of
    a GameState is a list of Effects, and Actions can supply Effects for this list.
    
    * Effects *
    
    Effects are managed in tetris_io.ts. When state is reduced in this file, an altered
    GameState, with no Effects, is provided for each base Action. The Action then
    uses Effects to prescribe what tangible changes should happen for the user. Think
    something similar to the IO Monad in Haskell (though confusingly, you might think
    of these Effects as better described as Actions there). The result of executing
    all of the accumulated Effects occurs at the final subscribe call. This way, no
    effectful code is present within the streams or Actions.
   
The value of designing the Tetris game in this way is visible in the ease with which it
usually can be extended. Functional code can be concise and simple, but also powerful.
Object-oriented programming seeks to minimise dependencies between different parts of
a program by information hiding, and models the program as a series of interacting
objects which fulfill distinct roles. Functional programming attempts to address a
similar problem, but does so by minimsing (ideally, eliminating) the mutability of state
across the program. There is then no need to "hide" things, because they cannot be
modified in a way which would break existing functions. Reactive programming then manages
asynchronous behaviour, where functions are "subscribed" or listen to events in
time. Predominantly, observable streams are used here - if you think of an array as a
"pull" data structure, where you request data from it, then a stream is a "push" data
structure, which provides data as it becomes available.

In this program, these three paradigms are interleaved; we make use of interfaces to
deeply-immutable objects, which are emmitted through observable streams.

    * Features *
    
    The game features:
    
        * pseudo-random ordering of tetrominoes;
        
        * scoring, with higher scores afforded when more lines are cleared at once,
          or at higher levels;
          
        * leveling, with appropriate difficulty scaling which includes faster falling
          pieces which lock-in sooner;
          
        * pausing, and;
        
        * piece preview.
