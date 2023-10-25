import { createContext, useReducer } from 'react';

import TotalCards from './constants'

export const GameConfigContext = createContext(null)
export const GameConfigDispatchContext = createContext(null)

export function GameConfigProvider({children}) {
    const [gameConfig, dispatch] = useReducer(
        gameConfigReducer,
        initialConfig
    )
   

    return (
        <GameConfigContext.Provider value={gameConfig}>
            <GameConfigDispatchContext.Provider value={dispatch}>
                {children}
            </GameConfigDispatchContext.Provider>
        </GameConfigContext.Provider>
    )

    

    function gameConfigReducer(gameConfig,action){
        const Shuffle = (a)=>{
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        switch (action.type) {
            case 'addCountTime' : {
                return {
                    ...gameConfig,
                    countTime : gameConfig.countTime + 1
                }
            }
            case 'gameStart' : {
                return {
                    ...gameConfig,
                    gameBackGroundColor : "#000",
                    statusBarHidden:true
                }
            }
            case 'gameEnd' : {
                return {
                    ...gameConfig,
                    gameBackGroundColor : gameConfig.initBackGroundColor,
                    statusBarHidden:false
                }
            }
            case 'shuffleCards' : {
                    const shuffledCards = Shuffle(gameConfig.allCards)
                    return {
                        ...gameConfig,
                        allCards:shuffledCards
                    }
            }
            case 'setGameConfig' : {
                return {
                    ...gameConfig,
                    countTime: action.countTime,
                    autoShuffle: action.autoShuffle,
                    simotaneousCardDisplay: action.simotaneousCardDisplay,
                }
        }
        }
    }
}

const initialConfig = {
    countTime:6,
    initBackGroundColor:'#FFD87B',
    gameBackGroundColor:'#FFD87B',
    gameThemeColor:'#000',
    statusBarHidden:false,
    autoShuffle:false,
    allCards: TotalCards,
    simotaneousCardDisplay:false

}