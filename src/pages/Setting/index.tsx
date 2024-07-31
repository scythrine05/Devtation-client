import React from "react";

export default function Setting() {
  return (
    <div>
      <div>
        <img src="#" />
      </div>
      <div>
        <div>
          <form>
            Name <input type="text" />
            Username <input type="text" />
            Email <input type="email" />
            Bio <textarea />
          </form>
        </div>
        <div>
          Connected Apps
          <button>Github</button>
          <button>Gitlab</button>
        </div>
        <div>
          <button>Change Password</button>
        </div>
        <div>
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  );
}
