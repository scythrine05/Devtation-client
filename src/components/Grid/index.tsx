import Card from "/src/components/Card";
import { CardData } from "/src/types";

import "./grid.style.css";

const Grid = ({ data }: CardData[] | any) => {
  return (
    <div className="grid gap-6 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data.length > 0 &&
        data.map((item: CardData) => (
          <Card
            key={item._id}
            _id={item._id}
            title={item.title}
            authorUsername={item.authorUsername}
            tags={item.tags}
            authorId={item.authorId}
          />
        ))}
    </div>
  );
};

export default Grid;
