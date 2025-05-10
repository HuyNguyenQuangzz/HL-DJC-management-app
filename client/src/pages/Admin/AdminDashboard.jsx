import { useEffect } from "react";
import { Button, Input, Select, notification } from "antd";
import { useState } from "react";
import DataList from "../../components/DataList";
import useRequestStore from "../../store/useRequestStore";

const { Option } = Select;

function Dashboard() {
  const { itemTypes, fetchItemTypes, addData } = useRequestStore();
  const [company, setCompany] = useState("");
  const [itemType, setItemType] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchItemTypes();
  }, [fetchItemTypes]);

  const handleSubmitData = async () => {
    if (!company.trim() || !itemType || !amount) {
      notification.error({
        message: "Company, Item Type, and Amount are required",
      });
      return;
    }
    try {
      await addData({ company, itemType, amount: parseFloat(amount), note });
      setCompany("");
      setItemType("");
      setAmount("");
      setNote("");
      notification.success({ message: "Data submitted successfully" });
    } catch (err) {
      notification.error({ message: "Failed to submit data" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 p-6 bg-white rounded-lg shadow">
        <Input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mb-4"
        />
        <Select
          placeholder="Select Item Type"
          value={itemType}
          onChange={(value) => setItemType(value)}
          className="w-full mb-4"
        >
          {itemTypes.map((type) => (
            <Option key={type._id} value={type._id}>
              {type.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        />
        <Input.TextArea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleSubmitData} className="w-full">
          Submit Data
        </Button>
      </div>
      <DataList />
    </div>
  );
}

export default Dashboard;
