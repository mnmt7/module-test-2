import { useEffect, useState } from "react";

import Menu from "./components/Menu/Menu.jsx";
import Notes from "./components/Notes/Notes.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      {(!isMobile || !activeGroup) && (
        <Menu
          onGroupSelection={setActiveGroup}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
        />
      )}
      {!isMobile && !activeGroup && <Welcome />}
      {activeGroup && (
        <Notes
          key={activeGroup}
          activeGroup={activeGroup}
          isMobile={isMobile}
          onBack={() => setActiveGroup(null)}
        />
      )}
    </div>
  );
}

export default App;
