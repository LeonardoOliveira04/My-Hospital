export class Video {
    id!: number;
    name!: string;
    description!: string;
    image!: string;
    url!: string;
}

export const VIDEOS: Video[] = [
    {
    id: 1,
    name: "Best CS:GO Plays of 2019",
    description: "Best plays of 2019",
    image: "assets/images/2019.jpeg",
    url:"https://www.youtube.com/embed/YHsOMvbpbfA",
    },
    {
    id: 2,
    name: "Best CS:GO Plays of 2020",
    description: "Best plays of 2020",
    image: "assets/images/2020.jpeg",
    url:"https://www.youtube.com/embed/z40db4NiYDw",
    },
    {
    id:3,
    name: "Best CS:GO Plays of 2021",
    description: "Best plays of 2021",
    image: "assets/images/2021.jpg",
    url:"https://www.youtube.com/embed/DQXi0k3zpPo",
    },
    {
    id:4,
    name: "Best CS:GO Plays of 2022",
    description: "Best plays of 2022",
    image: "assets/images/2022.jpg",
    url:"https://www.youtube.com/embed/HX0SsIPXosc",
    },
    ];