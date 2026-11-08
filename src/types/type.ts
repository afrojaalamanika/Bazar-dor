// import { string } from "better-auth";
// import { Interface } from "readline";

// import { number } from "better-auth";

export  interface ICategory{

  id: string;
  slug: string,
  nameBn: string;
  icon: string;
}


type category={
     
        market:  string
        division:  string
        min: number
        max: number
      
}








export interface IProduct{
    
    id: number
    slug: string
    nameBn:  string,
    category:  string
    categoryNameBn:  string
    categoryIcon: string
    unit: string
    image:  string
    today: number
    yesterday: number
    lastWeek: number
    lastMonth: number
    change: {
      dir:  `up`|`down`|`flat`;
      pct: number
    },
    markets: category[];
     

}











