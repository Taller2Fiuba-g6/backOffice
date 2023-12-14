import Hashtags from "./Hashtags";
import NewSnaps from "./NewSnaps";

const SnapsMetrics = () => {
    return (
        <main>
            <div className="charts_container">
                <NewSnaps />
                <Hashtags />
            </div>
        </main>
    );
};

export default SnapsMetrics;
