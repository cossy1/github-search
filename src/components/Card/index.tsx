import React from "react";
import { truncateText } from "../../helpers/truncateText";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
    MdOutlineCancel,
    MdOutlineSubscriptions,
    MdOutlineEmojiEvents,
} from "react-icons/md";
import { GiShadowFollower } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";

interface ICardProps {
    src: string;
    name: string;
    type: string;
    site_admin: boolean;
    score: string;
    followers_url: string;
    subscriptions_url: string;
    organizations_url: string;
    events_url: string;
}

const Card: React.FC<ICardProps> = ({ src, name, type, site_admin, score, events_url, followers_url, subscriptions_url, organizations_url }) => {
    return (
        <div className="bg-white flex items-center rounded-xl shadow-lg">
            <div className="bg-blue-500 p-2 sm:p-4 w-1/2 sm:w-1/3 rounded-s-xl shadow-md">
                <img
                    src={src}
                    alt="img"
                    className="rounded-full object-cover border border-gray-500"
                />
            </div>

            <div className="pl-2 sm:pl-4 w-1/2 gap-5 flex flex-col justify-between">
                <div>
                    <p className="capitalize text-sm lg:text-lg">
                        Name: {truncateText(name, 8)}
                    </p>
                    <p className="capitalize text-sm lg:text-lg">Type: {type}</p>
                    <p className="text-sm lg:text-lg">Score: {score}</p>
                    <p className="text-sm lg:text-lg flex items-center justify-start">
                        Site Admin:{" "}
                        <span className="pl-2">
                            {site_admin ? (
                                <IoCheckmarkCircleOutline className="w-5 h-5" />
                            ) : (
                                <MdOutlineCancel className="w-5 h-5" />
                            )}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a href={followers_url} target="_blank" rel="noopener noreferrer">
                        <GiShadowFollower className="w-5 h-5 cursor-pointer hover:bg-blue-300 transition duration-500 pb-1 hover:rounded-full" />
                    </a>
                    <a href={events_url} target="_blank" rel="noopener noreferrer">
                        <MdOutlineEmojiEvents className="w-5 h-5 cursor-pointer hover:bg-blue-300 transition duration-500 pb-1 hover:rounded-full" />
                    </a>
                    <a href={subscriptions_url} target="_blank" rel="noopener noreferrer">
                        <MdOutlineSubscriptions className="w-5 h-5 cursor-pointer hover:bg-blue-300 transition duration-500 pb-1 hover:rounded-full" />
                    </a>
                    <a href={organizations_url} target="_blank" rel="noopener noreferrer">
                        <GoOrganization className="w-5 h-5 cursor-pointer hover:bg-blue-300 transition duration-500 pb-1 hover:rounded-full" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;
