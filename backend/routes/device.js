const express = require('express');

const Device = require('./../models/device');

const router = express.Router();

router.post('', (req, res, next) => {
  console.log('post called....');
  const device = new Device({
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate
  });
  device.save().then((result) => {
    console.log('id', result.id);
    console.log('_id', result._id);
    res.status(201).json({
      message: 'Device added successfully.',
      deviceId: result._id
    });
  });
});

router.put('/:id', (req, res, next) => {

  console.log('update!!!!!!!!!');
  const device = new Device({
    _id: req.body.id,
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: 'Admin',
    createdDate: Date.now().toLocaleString()
  });
console.log('backend update', device);
  Device.updateOne({
    _id: req.params.id
  }, device)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update successful.'});
  });
});

router.get('', (req, res, next) => {
  Device.find()
    .then(results => {

      // TODO: 使用map解決後端_id對應前端模型需要的id, map可作資料轉換(model --> view model)
      // 這邊在device service用rxjs - pipe處理
      res.status(200).json({
        message: 'Devices fetch successfully!',
        devices: results
      });
    });
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);

  Device.deleteOne({
      _id: req.params.id
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Device deleted.'
      });
    });


});













module.exports = router;
