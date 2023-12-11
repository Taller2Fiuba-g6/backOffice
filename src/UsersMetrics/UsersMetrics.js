import Blocked from "./Blocked";
import LoggedEmail from "./LoggedEmail";
import LoggedFederatedIdentity from "./LoggedFederatedIdentity";
import RegisteredEmail from "./RegisteredEmail";
import RegisteredFederatedIdentity from "./RegisteredFederatedIdentity";

const UsersMetrics = () => {
    return (
        <main>
            <div className="charts_container">
                <RegisteredEmail />
                <RegisteredFederatedIdentity />
                <LoggedEmail />
                <LoggedFederatedIdentity />
                <Blocked />
            </div>
        </main>
    );
};

export default UsersMetrics;
