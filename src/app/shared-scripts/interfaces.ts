interface Deck
{
  name: string;
  cards: number[];
}

interface Layout
{
  name: string;
  cardAmount: number;
}

interface Card
{
  name: string;
  id: number;
  image: string;
  descriptions: Description[];
}

interface Description
{
  layoutName: string;
  position: number;
  descriptionUpright : string;
  descriptionReversed : string;  

}
