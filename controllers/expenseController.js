const { json } = require("express");
const fs = require("fs");

module.exports = {
  fetchDetail: async (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json"));
    res.status(200).send({ message: " data successful to fetch", data: data });
  },
  fetchList: async (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json"));
    let idParams = parseInt(req.params.id);
    let exist = false;
    try {
      data.expense.forEach((element) => {
        if (element.id === idParams) exist = true;
      });
      if (exist) {
        const selectedData = data.expense.filter((selected) => {
          return selected.id === idParams;
        });
        res
          .status(200)
          .send({
            message: "fetch data was successful",
            data: selectedData[0],
          });
      } else res.status(404).send({ message: "data is not exist" });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  },
  deleteExpense: async (req, res) => {
    let idParams = parseInt(req.params.id);
    let data = JSON.parse(fs.readFileSync("./db.json"));
    const newData = data.expense.filter((el) => {
      return el.id !== idParams;
    });
    data.expense = newData;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(200).send({ isSuccess: true, message: "Data was deleted" });
  },
  addExpense: async (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json"));
    let addExp = data.expense;
    addExp.push({id: addExp[addExp.length - 1].id + 1, ...req.body});
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(200).send({message: "Data success to add", data: data.expense})
  },
  editExpense : async (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json"));
    const idParams = parseInt(req.params.id);
    const editExp = data.expense;
    let selectedDataIndex = null;

    editExp.forEach((el, index) => {
        if(el.id === idParams) {
            selectedDataIndex = index
            data.expense[index] = {...data.expense[index], ...req.body}
        }
    })
    if(selectedDataIndex){
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.status(200).send({message: " data was updated", data: data.expense[selectedDataIndex]})
    } else {
        res.status(404).send("Data not exist")
    }
  },
  totalExpCat: async (req,res) => {
    let datas = JSON.parse(fs.readFileSync("./db.json")).expense;
    let catParams = req.params.category;
    let totalExpense = 0;
    let exist = false;

    datas.forEach((data) => {
        if(data.category.toLowerCase() == catParams.toLowerCase()) {
            totalExpense = totalExpense + data.nominal
            exist = true;
        }
    })
    if(exist) {
        res.status(200).send({ isSuccess : true, total: totalExpense})
    } else {
        res.status(404).send({error : "category not exist"})
    }
  }
};
