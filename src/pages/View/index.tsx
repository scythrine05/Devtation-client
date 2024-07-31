import React from "react";

import "./view.style.css";
export default function View() {
  return (
    <div className="view-wrapper">
      <div className="view-container">
        <div className="view-display">Image</div>
        <div className="view-options">
          <div className="view-votes">
            upvotes
          </div>
          <div className="view-update">
            last update
          </div>
        </div>
        <div className="view-desc">Description</div>
      </div>
    </div>
  );
}
