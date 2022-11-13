import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/AddReminder.css";

const AddRemider = ({ setisCrossed, reminders, setreminders }) => {
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(false);
  const [inputs, setinputs] = useState({
    title: "",
    difficulty: "EASY",
    noofques: "",
    time: "",
    topic: "",
  });
  useEffect(() => {
    setisDisabled(
      inputs.title.length > 0 &&
        inputs.noofques.length > 0 &&
        inputs.topic.length > 0 &&
        inputs.time.length > 0
    );
  }, [inputs.title, inputs.noofques, inputs.time, inputs.topic]);

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("https://minigrinders.herokuapp.com/api/reminders/add", {
        title: inputs.title,
        difficulty: inputs.difficulty,
        noofques: inputs.noofques,
        topic: inputs.topic,
        time: inputs.time,
        ourUser: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setisCrossed(false);
    console.log(inputs);
    sendRequest().then((data) => {
      console.log(data);
      setreminders((prevreminder) => {
        return [...prevreminder, data.Reminder];
      });
    });
  };

  return (
    <>
      <div className="add_reminder_back">
        <div className="add_reminder_container">
          <div className="add_reminder_wrapper">
            <form
              onSubmit={handleSubmit}
              className="add_reminder_form"
              action=""
            >
              <div class="cross_btn_div">
                <div
                  class="cross_btn"
                  onClick={() => setisCrossed(false)}
                ></div>
              </div>
              <h1>Set a reminder</h1>
              <div className="add_reminder_form_wrapper">
                <label htmlFor="">Title</label>
                <input
                  name="title"
                  onChange={handleChange}
                  value={inputs.title}
                  placeholder="Enter a title for the Reminder"
                  type="text"
                />
                <label htmlFor="">Difficulty for Questions</label>
                <select
                  name="difficulty"
                  onChange={handleChange}
                  value={inputs.difficulty}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                <label htmlFor="">No of Questions</label>
                <input
                  name="noofques"
                  onChange={handleChange}
                  value={inputs.noofques}
                  type="Number"
                />
                <label htmlFor="">Set Time</label>

                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={inputs.time}
                />
                <label htmlFor="">Topic</label>
                <input
                  name="topic"
                  onChange={handleChange}
                  value={inputs.topic}
                  type="text"
                  placeholder="Enter a topic "
                />
                <div className="add_reminder_btn_div">
                  <button disabled={!isDisabled}>Add reminder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddRemider;
