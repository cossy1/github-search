import React from "react";


interface ItemListProps {
    src: string;
    name: string;
}

const ItemList: React.FC<ItemListProps> = ({ src, name }) => {

    return (
        <div className="flex justify-between items-center w-full">
            <img src={src} alt='img' className="rounded-full object-cover h-28 w-28 border-2 border-cyan-800" />
            <p className="capitalize">{name}</p>
        </div>
    );
}

export default ItemList;