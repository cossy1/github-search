import Card from "../Card";
import Loader from "../Loader";

interface IResultsProps {
    data: Record<string, any>[]
    isLoading: boolean;
    hasSearched: boolean;
}

const Results: React.FC<IResultsProps> = ({ isLoading, hasSearched, data }) => {

    return <div className="p-6">
        {isLoading && <Loader />}

        {!isLoading && hasSearched && (
            <>
                {data.length === 0 ? (
                    <h3>No data Found</h3>
                ) : (
                    <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {data.map((res, index) => {
                            const {
                                type,
                                login,
                                avatar_url,
                                site_admin,
                                score,
                                events_url,
                                organizations_url,
                                subscriptions_url,
                                followers_url,
                            } = res ?? {};
                            return (
                                <li key={index} className="mb-2">
                                    <Card
                                        src={avatar_url}
                                        name={login}
                                        type={type}
                                        site_admin={site_admin}
                                        score={score}
                                        events_url={events_url}
                                        followers_url={followers_url}
                                        subscriptions_url={subscriptions_url}
                                        organizations_url={organizations_url}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </>
        )}
    </div>
}

export default Results;