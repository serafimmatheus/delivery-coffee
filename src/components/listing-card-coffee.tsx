import { Coffee } from "@prisma/client";
import CardCoffee from "./card-coffee";

interface LinstingCardCoffeeProps {
  coffees: Coffee[];
}

const LinstingCardCoffee = ({ coffees }: LinstingCardCoffeeProps) => {
  return (
    <div className="grid grid-cols-4 mt-20 mb-20 gap-y-20 gap-x-2">
      {coffees.map((coffee) => (
        <CardCoffee key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
};

export default LinstingCardCoffee;
