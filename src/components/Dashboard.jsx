import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [paids, setPaids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // axios.defaults.baseURL = "https://wallet.b.goit.study/api";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const fetchPaids = async () => {
      try {
        const response = await axios.get("/transactions");
        setPaids(response.data);
        setIsLoading(true);

        console.log(data);
      } catch (error) {
        console.error("Veriler alınamadı:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaids();
  }, []);
  return (
    <div>
      <div>
        <ul>
          {paids.map((paid) => (
            <li key={paid.id} id={paid.id}>
              <table>
                <tr>
                  <th>Date</th>
                  <td>{paid.transactionDate}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{paid.type}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{paid.categoryId}</td>
                </tr>
                <tr>
                  <th>Comment</th>
                  <td>{paid.comment}</td>
                </tr>
                <tr>
                  <th>Sum</th>
                  <td>{paid.amount}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
