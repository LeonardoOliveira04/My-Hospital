export class Player {
    name!: string;
    description!: string;
    image!: string;
    followers!: number;
    trophies!: number;
    url!: string;
}

export const PLAYERS: Player[] = [
    {
        name: "S1mple",
        description: "Oleksandr Olehovych Kostyliev (born 2 October 1997), better known as s1mple, is a Ukrainian professional Counter-Strike: Global Offensive player for Natus Vincere. He is considered to be one of the best players in Global Offensive history.",
        image: "assets/images/s1mple.png",
        followers: 764400,
        trophies: 1,
        url: "https://www.youtube.com/embed/xyFOJq5enJo",
    },
    {
        name: "FalleN",
        description: "Gabriel Toledo de Alcântara Sguario (born May 30, 1991), better known as FalleN, is a Brazilian professional Counter-Strike: Global Offensive player and former Counter-Strike: Source and Counter-Strike 1.6 player. He played the role of an AWPer being considered one of the best of all time in this role.",
        image: "assets/images/fallen.png",
        followers: 1200000,
        trophies: 2,
        url: "https://www.youtube.com/embed/TJ5qVs_9KK4",
    },
    {
        name: "ZywOo",
        description: "Mathieu Herbaut (born November 9, 2000), better known as ZywOo, is a French professional Counter-Strike: Global Offensive player for Team Vitality. He is considered one of the best players in Global Offensive history, having been ranked the No. 1 player in the world by HLTV in 2019 and 2020. He is also sometimes nicknamed -The Chosen One- due to being born on the day of the original Counter Strike game's commercial release. ",
        image: "assets/images/zywoo.png",
        followers: 284000,
        trophies: 1,
        url: "https://www.youtube.com/embed/J_5Df59th-I",
    }
];