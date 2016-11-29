import React from 'react';

export default class FloatLeft extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <div className="left_box">
          <ul className="left_item">
            <li><img className="profile_img" src="https://pbs.twimg.com/profile_images/776752392406654977/epY5miMb.jpg" /></li>
            <li>
              <div className="fl_timeline fl_active"></div>
              <div className="fl_dot"></div>
            </li>
            <li>
              <div className="fl_notification"></div>
              <div className=""></div>
            </li>
            <li>
              <div className="fl_messages"></div>
              <div className=""></div>
            </li>
            <li>
              <div className="fl_userinfo"></div>
              <div className=""></div>
            </li>
            <li>
              <div className="fl_list"></div>
              <div className=""></div>
            </li>
            <li>
              <div className="fl_search"></div>
              <div className=""></div>
            </li>
          </ul>
        </div>
        <div className="bottom_item">
        <div className="fl_write"></div>
        </div>
      </div>
    );
  }
}