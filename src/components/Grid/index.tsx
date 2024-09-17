import Card from "/src/components/Card";
import { CardData } from "/src/types";

import "./grid.style.css";

const Grid = ({ data }: CardData[] | any) => {
  return (
    <div className="grid-container">
      {data.length > 0 &&
        data.map((item: CardData) => (
          <Card
            key={item._id}
            _id={item._id}
            title={item.title}
            authorUsername={item.authorUsername}
            tags={item.tags}
          />
        ))}
    </div>
  );
};

export default Grid;
