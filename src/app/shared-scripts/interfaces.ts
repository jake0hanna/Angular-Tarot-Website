export interface Deck
{
  name: string;
  cards: number[];
}

export interface Layout
{
  name: string;
  cardAmount: number;
}

export interface Card
{
  name: string;
  id: number;
  image: string;
  descriptions: Description[];
}

export interface Description
{
  layoutName: string;
  position: number;
  descriptionUpright : string;
  descriptionReversed : string;  

}
