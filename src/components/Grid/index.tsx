import { useState, useEffect } from "react";
import Card from "/src/components/Card";
import { CardData } from "/src/types";

import "./grid.style.css";

const Grid = ({ data }: { data: CardData[] }) => {
  const [gridData, setGridData] = useState<CardData[]>([]);

  useEffect(() => {
    setGridData(data); // Set initial data
  }, [data]);

  const handleRemove = (id: string) => {
    setGridData((prevData) => prevData.filter((item) => item._id !== id));
  };

  return (
    <div className="grid gap-6 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {gridData.length > 0 &&
        gridData.map((item) => (
          <Card
            key={item._id}
            _id={item._id}
            title={item.title}
            authorUsername={item.authorUsername}
            authorProfileImage={item.authorProfileImage}
            tags={item.tags}
            authorId={item.authorId}
            imageUrls={item.imageUrls}
            onRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default Grid;
