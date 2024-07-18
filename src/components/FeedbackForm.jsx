import { useState, useEffect, useContext } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit.item]);

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Feedback must be at least ten characters.");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      addFeedback(newFeedback);
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(rating) => {
            setRating(rating);
          }}
        />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Submit
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}
