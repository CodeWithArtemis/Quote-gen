import Styles from "../../styles/modules/Quotes.module.scss";
const QuoteItems = (props) => {
  return (
    <div
      className={
        props.varient === "history"
          ? `${Styles.quote_container} ${Styles.history}`
          : Styles.quote_container
      }
    >
      <div className={Styles.quote_category}>{props.category}</div>
      <div className={Styles.quote_text}>{props.quote}</div>
      <div className={Styles.quote_author}>{props.author}</div>
    </div>
  );
};

export default QuoteItems;
