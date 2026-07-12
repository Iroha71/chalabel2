import { NavLink } from "react-router";
import { PATHS } from "../consts/routes";

function Index() {
  return (
    <div>
      <h1>chalabel2</h1>
      <NavLink to={PATHS.licenses}>ライセンス一覧</NavLink>
    </div>
  );
}

export default Index;
