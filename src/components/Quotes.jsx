import { useEffect, useState } from "react";
import QuoteItems from "./QuoteItems";
import Styles from "../../styles/modules/Container.module.scss";
import { categories } from "../../data/categories";
const Quotes = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [category, setCategory] = useState("");

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };
  const getQuotes = async () => {
    try {
      setDisabled(true);
      quotes && setData((prev) => [...prev, ...quotes]);
      setLoading(true);
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "Dnwme2OCDPpddsgXaAoQ1g==iUFA9iNDcKxq0G5Z",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQuotes(data); // Set the new quotes directly
        console.log(data);

        // Move this inside the if block
      } else {
        console.error("Failed to fetch quotes");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, [category]); // The empty dependency array ensures that it runs only once when the component mounts

  return (
    <>
      <div className="Display">
        <div>
          {loading ? (
            <h1 className={Styles.loading}>Loading Quotes...</h1>
          ) : (
            quotes?.map((e, i) => (
              <QuoteItems
                key={i}
                category={e?.category}
                quote={e?.quote}
                author={e?.author}
              />
            ))
          )}
        </div>
      </div>

      <div className={Styles.input}>
        <div>
          <div className={Styles.quote} onClick={getQuotes} disabled={disabled}>
            Load Quote
          </div>
          <label htmlFor="category"></label>
          <select
            className={Styles.select}
            value={category}
            onChange={handleSelect}
          >
            {categories.map((e) => (
              <option key={e} className={Styles.options} value={e}>
                {e}
              </option>
            ))}
          </select>
          <button className={Styles.quote} onClick={() => setData([])}>
            Delete History
          </button>
        </div>
      </div>

      <div>
        {data.reverse()?.map((e, i) => (
          <QuoteItems
            varient={"history"}
            key={i}
            category={e?.category}
            quote={e?.quote}
            author={e?.author}
          />
        ))}
      </div>
    </>
  );
};

export default Quotes;
