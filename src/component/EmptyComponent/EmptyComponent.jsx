import { useNavigate } from "react-router";
import styles from "./EmptyComponent.module.css";

const EmptyComponent = ({ msg, goToUrl, btnMsg }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyComponentWrapper}>
      <h2>{msg}</h2>
      <button className="btn btn-light m-2" onClick={() => navigate(goToUrl)}>
        {btnMsg}
      </button>
    </div>
  );
};

export { EmptyComponent };
