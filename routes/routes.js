const express = require('express');
const fs = require('fs');
const Model = require('../models/model');
const TrackModel = require('../models/trackModel');

const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await TrackModel.find()
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getOne/:date', async (req, res) => {
  try {
    const { date } = req.params
    const workingTimeData = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          }
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
          },
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      },
    ]);
    let workingTime = workingTimeData.length === 0 ? 0 : workingTimeData[0].count * 7
    workingTime = new Date(workingTime * 1000).toISOString().substring(11, 16)

    const data4Card = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          }
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
            UserEvent: "$UserEvent"
          },
          activityCnt: {
            $sum: "$DistanceValue"
          }
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      }
    ]);
    const chartData4OverallEvent = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          },
          UserEvent: 1
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
            UserEvent: "$UserEvent"
          },
          activityCnt: {
            $sum: "$DistanceValue"
          }
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      }
    ]);
    // console.log(chartData4OverallEvent)
    const chartData4SystemEvent = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          },
          UserEvent: 2
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
            UserEvent: "$UserEvent"
          },
          activityCnt: {
            $sum: "$DistanceValue"
          }
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      }
    ]);
    // console.log(chartData4SystemEvent)
    const chartData4KeyboardEvent = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          },
          UserEvent: 3
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
            UserEvent: "$UserEvent"
          },
          activityCnt: {
            $sum: "$DistanceValue"
          }
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      }
    ]);
    // console.log(chartData4KeyboardEvent)
    const chartData4MouseEvent = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          DistanceValue: 1,
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          },
          UserEvent: 4
        },
      },
      {
        $group: {
          _id: {
            TimeStamp: "$TimeStamp",
            UserEvent: "$UserEvent"
          },
          activityCnt: {
            $sum: "$DistanceValue"
          }
        }
      },
      {
        $sort: {
          "_id.TimeStamp": 1
        }
      }
    ]);
    const chartData4Image = await TrackModel.aggregate([
      {
        $project: {
          TimeStamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$TimeStamp"
            }
          },
          fileName: "$fileName",
          UserEvent: 1
        },
      },
      {
        $match: {
          "TimeStamp": {
            "$gte": date.concat(' 00'),
            "$lte": date.concat(' 24')
          },
          UserEvent: 5
        },
      },
    ]);
    // console.log(chartData4MouseEvent)
    if (data4Card.length === 0) {
      res.status(200).json({ cardData: {}, chartData: {} })
    } else {
      const workStartTime = data4Card[0]._id.TimeStamp.split(' ')[1]
      const workEndTime = data4Card[data4Card.length - 1]._id.TimeStamp.split(' ')[1]
      let overallAction = 0
      let systemAction = 0
      let keyboardAction = 0
      let mouseAction = 0
      data4Card.map(t => {
        if (t._id.UserEvent === 1) overallAction += t.activityCnt
        else if (t._id.UserEvent === 2) systemAction += t.activityCnt
        else if (t._id.UserEvent === 3) keyboardAction += t.activityCnt
        else if (t._id.UserEvent === 4) mouseAction += t.activityCnt
      })
      const cardData = {
        overallAction: `${overallAction}`, systemAction: `${systemAction}`, keyboardAction: `${keyboardAction}`,
        mouseAction: `${mouseAction}`, workStartTime, workEndTime, workingTime: workingTime
      }

      // let flg
      // let workingM
      // if (endM - startM >= 0) {
      //   workingM = endM - startM
      //   flg = 0
      // } else {
      //   workingM = 60 - startM + endM
      //   flg = 1
      // }
      // let workingH = endH - startH - flg

      const startH = parseInt(data4Card[0]._id.TimeStamp.split(' ')[1].split(':')[0])
      const startM = parseInt(data4Card[0]._id.TimeStamp.split(' ')[1].split(':')[1])
      const endH = parseInt(data4Card[data4Card.length - 1]._id.TimeStamp.split(' ')[1].split(':')[0])
      const endM = parseInt(data4Card[data4Card.length - 1]._id.TimeStamp.split(' ')[1].split(':')[1])
      let flag
      let workingM
      if (endM - startM >= 0) {
        workingM = endM - startM
        flag = 0
      } else {
        workingM = 60 - startM + endM
        flag = 1
      }
      const workingH = endH - startH - flag
      const workingPeriod = workingH * 60 + workingM
      const chartLabels = []
      const trackData1 = []
      const trackData2 = []
      const trackData3 = []
      const trackData4 = []
      const imageData = []
      const startMinutes = startH * 60 + startM
      // console.log(chartData4Image)
      for (let i = 0; i <= workingPeriod; i++) {
        // let label = ''
        // if (i === 0) label = data4Card[0]._id.TimeStamp.split(' ')[1]
        // else if (i === workingPeriod) label = data4Card[data4Card.length - 1]._id.TimeStamp.split(' ')[1]

        // if (((startM + i) % 10 === 0) && i >= 10 && workingPeriod - i >= 10) {
        label = new Date((startMinutes + i) * 1000 * 60).toISOString().substring(11, 16)
        // }
        chartLabels.push(label)
        const overallValue = chartData4OverallEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`) ? chartData4OverallEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`).activityCnt : 0
        const systemValue = chartData4SystemEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`) ? chartData4SystemEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`).activityCnt : 0
        const keyboardValue = chartData4KeyboardEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`) ? chartData4KeyboardEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`).activityCnt : 0
        const mouseValue = chartData4MouseEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`) ? chartData4MouseEvent.find(t => t._id.TimeStamp.split(' ')[1] === `${label}`).activityCnt : 0

        let imageFileName = chartData4Image.find(t => t.TimeStamp.split(' ')[1] === `${label}`) ? chartData4Image.find(t => t.TimeStamp.split(' ')[1] === `${label}`).fileName : ''
        imageFileName = imageFileName ? imageFileName : ''
        // console.log(imageFileName)
        trackData1.push(overallValue)
        trackData2.push(systemValue)
        trackData3.push(keyboardValue)
        trackData4.push(mouseValue)
        imageData.push(imageFileName)
      }

      const chartData = { chartLabels, trackData1, trackData2, trackData3, trackData4 }
      res.status(200).json({ cardData, chartData, imageData })
    }
  }
  catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
})

router.get('/index.aspx', async (req, res) => {
  try {
    const data = req.query

    // const base64 = fs.readFileSync('image.jpg', {encoding: 'base64'});
    const base64 = data.Base64Data
    const userEvnt = data.UserEvent
    if (userEvnt == 5) {
      data.fileName = `img${new Date().getTime()}.jpg`
      fs.writeFileSync(`../frontend/public/static/screenshots/img${new Date().getTime()}.jpg`, base64, 'base64', function (err) {
        if (err) console.log('error ------------->', err);
      });
    }

    data.TimeStamp = new Date(data.TimeStamp)
    const newTrackData = new TrackModel(data)
    const result = await newTrackData.save()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;