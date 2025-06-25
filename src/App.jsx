import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Banner from "./Banner"; // Optional - your banner component

export default function StockAverageCalculator() {
  const [purchases, setPurchases] = useState([
    { price: "", quantity: "" },
    { price: "", quantity: "" },
  ]);

  const [results, setResults] = useState({
    totalQuantity: 0,
    totalAmount: 0,
    averagePrice: 0,
  });

  const [chartData, setChartData] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...purchases];
    updated[index][field] = value;
    setPurchases(updated);
  };

  const addPurchase = () => {
    setPurchases([...purchases, { price: "", quantity: "" }]);
  };

  const calculateAverage = () => {
    let totalQuantity = 0;
    let totalAmount = 0;

    const computedData = purchases.map((p, i) => {
      const quantity = Number(p.quantity) || 0;
      const price = Number(p.price) || 0;
      const amount = price * quantity;

      totalQuantity += quantity;
      totalAmount += amount;

      return {
        name: `Purchase ${i + 1}`,
        Price: price,
        Quantity: quantity,
        amount,
      };
    });

    const averagePrice = totalQuantity
      ? (totalAmount / totalQuantity).toFixed(2)
      : 0;

    setResults({ totalQuantity, totalAmount, averagePrice });
    setChartData(computedData);
  };

  const reset = () => {
    setPurchases([
      { price: "", quantity: "" },
      { price: "", quantity: "" },
    ]);
    setResults({
      totalQuantity: 0,
      totalAmount: 0,
      averagePrice: 0,
    });
    setChartData([]);
  };

  return (
    <>
      <Banner />

      <div className="min-h-screen bg-[#f7f9ff] flex justify-center items-start py-10 px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl p-8">
          <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">
            Enter the details to calculate average share price
          </h2>

          <div className="md:flex gap-6">
            {/* Input Form Section */}
            <div className="md:w-2/3 space-y-6">
              {purchases.map((purchase, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm"
                >
                  <h3 className="text-base font-semibold text-gray-700 mb-4">
                    {index === 0
                      ? "First Purchase"
                      : index === 1
                      ? "Second Purchase"
                      : `Purchase ${index + 1}`}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Buy Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={purchase.price}
                          onChange={(e) =>
                            handleChange(index, "price", e.target.value)
                          }
                          onFocus={(e) =>
                            e.target.value === "0" ? (e.target.value = "") : null
                          }
                          placeholder="0"
                          className="w-full border border-gray-300 text-sm rounded-md pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={purchase.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                        onFocus={(e) =>
                          e.target.value === "0" ? (e.target.value = "") : null
                        }
                        placeholder="0"
                        className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addPurchase}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add new purchase
              </button>
            </div>

            {/* Result Summary */}
            <div className="md:w-1/3 bg-[#f4f8ff] p-6 rounded-md mt-8 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Share price
              </h3>
              <div className="text-sm text-gray-600 mb-1 flex justify-between">
                <span>Total quantity</span>
                <span>{results.totalQuantity}</span>
              </div>
              <div className="text-sm text-gray-600 mb-4 flex justify-between">
                <span>Average price</span>
                <span>{results.averagePrice}</span>
              </div>
              <hr className="mb-4 border-gray-300" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹ {results.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 border-t pt-6 flex flex-wrap gap-4">
            <button
              onClick={calculateAverage}
              className="bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded shadow-md hover:bg-blue-700"
            >
              Calculate Average
            </button>
            <button
              onClick={reset}
              className="bg-white text-sm font-semibold border border-gray-300 px-6 py-2.5 rounded hover:bg-gray-100"
            >
              Reset
            </button>
          </div>

          {/* Charts */}
          {chartData.length > 0 && (
            <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
              {/* Line Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Price" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="Quantity" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>

              {/* Pie Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"][
                            index % 5
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
