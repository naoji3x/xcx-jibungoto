import { type Option } from './option'
export const options: Record<string, Option> = {
  "telework_mobility_train_amount": {
    "option": "telework",
    "values": [
      -0.468854791
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_bus_amount": {
    "option": "telework",
    "values": [
      -0.112666772
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_taxi_amount": {
    "option": "telework",
    "values": [
      -0.060224246
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_private-car-driving_amount": {
    "option": "telework",
    "values": [
      -0.213660031
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_motorbike-driving_amount": {
    "option": "telework",
    "values": [
      -0.396275784
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_bicycle-driving_amount": {
    "option": "telework",
    "values": [
      -0.295237367
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_private-car-purchase_amount": {
    "option": "telework",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_motorbike-purchase_amount": {
    "option": "telework",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_private-car-maintenance_amount": {
    "option": "telework",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_motorbike-maintenance_amount": {
    "option": "telework",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "telework_mobility_bicycle-maintenance_amount": {
    "option": "telework",
    "values": [
      1
    ],
    "args": [
      "mobility_bicycle-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_train_amount": {
    "option": "closework",
    "values": [
      -0.22922947
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_bus_amount": {
    "option": "closework",
    "values": [
      -0.060322384
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_taxi_amount": {
    "option": "closework",
    "values": [
      -0.039534248
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_private-car-driving_amount": {
    "option": "closework",
    "values": [
      -0.085664689
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_motorbike-driving_amount": {
    "option": "closework",
    "values": [
      -0.165508879
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_bicycle-driving_amount": {
    "option": "closework",
    "values": [
      -0.200552878
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_private-car-purchase_amount": {
    "option": "closework",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_motorbike-purchase_amount": {
    "option": "closework",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_private-car-maintenance_amount": {
    "option": "closework",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_motorbike-maintenance_amount": {
    "option": "closework",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closework_mobility_bicycle-maintenance_amount": {
    "option": "closework",
    "values": [
      1
    ],
    "args": [
      "mobility_bicycle-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_airplane_amount": {
    "option": "mictourism",
    "values": [
      -0.516174479
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_train_amount": {
    "option": "mictourism",
    "values": [
      -0.127200104
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_bus_amount": {
    "option": "mictourism",
    "values": [
      -0.249140296
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_ferry_amount": {
    "option": "mictourism",
    "values": [
      -0.443690476
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_taxi_amount": {
    "option": "mictourism",
    "values": [
      -0.213498498
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_private-car-driving_amount": {
    "option": "mictourism",
    "values": [
      -0.216339849
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_car-sharing-driving_amount": {
    "option": "mictourism",
    "values": [
      -0.426661831
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_motorbike-driving_amount": {
    "option": "mictourism",
    "values": [
      -0.167651939
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_bicycle-driving_amount": {
    "option": "mictourism",
    "values": [
      -0.060696993
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_private-car-purchase_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_motorbike-purchase_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_car-sharing-rental_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_private-car-maintenance_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_motorbike-maintenance_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "mictourism_mobility_bicycle-maintenance_amount": {
    "option": "mictourism",
    "values": [
      1
    ],
    "args": [
      "mobility_bicycle-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_train_amount": {
    "option": "closeservice",
    "values": [
      -0.051969196
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_bus_amount": {
    "option": "closeservice",
    "values": [
      -0.046870163
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_taxi_amount": {
    "option": "closeservice",
    "values": [
      -0.20799268
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_private-car-driving_amount": {
    "option": "closeservice",
    "values": [
      -0.11914264
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_motorbike-driving_amount": {
    "option": "closeservice",
    "values": [
      -0.069132146
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_bicycle-driving_amount": {
    "option": "closeservice",
    "values": [
      -0.131234853
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_private-car-purchase_amount": {
    "option": "closeservice",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_motorbike-purchase_amount": {
    "option": "closeservice",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_private-car-maintenance_amount": {
    "option": "closeservice",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_motorbike-maintenance_amount": {
    "option": "closeservice",
    "values": [
      1
    ],
    "args": [
      "mobility_motorbike-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "closeservice_mobility_bicycle-maintenance_amount": {
    "option": "closeservice",
    "values": [
      1
    ],
    "args": [
      "mobility_bicycle-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_train_amount": {
    "option": "dailyshift",
    "values": [
      0.333333333
    ],
    "args": [
      "mobility_private-car-driving_amount",
      "mobility_taxi_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_bus_amount": {
    "option": "dailyshift",
    "values": [
      0.333333333
    ],
    "args": [
      "mobility_private-car-driving_amount",
      "mobility_taxi_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_taxi_amount": {
    "option": "dailyshift",
    "values": [
      -1
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_private-car-driving_amount": {
    "option": "dailyshift",
    "values": [
      -0.704901961
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_bicycle-driving_amount": {
    "option": "dailyshift",
    "values": [
      0.333333333
    ],
    "args": [
      "mobility_private-car-driving_amount",
      "mobility_taxi_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_private-car-purchase_amount": {
    "option": "dailyshift",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_car-sharing-rental_amount": {
    "option": "dailyshift",
    "values": [
      1
    ],
    "args": [
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_private-car-maintenance_amount": {
    "option": "dailyshift",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "dailyshift_mobility_bicycle-maintenance_amount": {
    "option": "dailyshift",
    "values": [
      1
    ],
    "args": [
      "mobility_bicycle-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_airplane_amount": {
    "option": "longshift",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_train_amount": {
    "option": "longshift",
    "values": [
      0.5
    ],
    "args": [
      "mobility_airplane_amount",
      "mobility_ferry_amount",
      "mobility_private-car-driving_amount",
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_bus_amount": {
    "option": "longshift",
    "values": [
      0.5
    ],
    "args": [
      "mobility_airplane_amount",
      "mobility_ferry_amount",
      "mobility_private-car-driving_amount",
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_ferry_amount": {
    "option": "longshift",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_private-car-driving_amount": {
    "option": "longshift",
    "values": [
      -0.295098039
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_car-sharing-driving_amount": {
    "option": "longshift",
    "values": [
      -1
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_private-car-purchase_amount": {
    "option": "longshift",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_car-sharing-rental_amount": {
    "option": "longshift",
    "values": [
      1
    ],
    "args": [
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "longshift_mobility_private-car-maintenance_amount": {
    "option": "longshift",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "rideshare_mobility_taxi_intensity": {
    "option": "rideshare",
    "values": [
      4
    ],
    "args": [
      "mobility_taxi-car-passengers"
    ],
    "operation": "question-answer-to-target-inverse",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "rideshare_mobility_private-car-driving_intensity": {
    "option": "rideshare",
    "values": [
      4
    ],
    "args": [
      "mobility_private-car-passengers"
    ],
    "operation": "question-answer-to-target-inverse",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "rideshare_mobility_car-sharing-driving_intensity": {
    "option": "rideshare",
    "values": [
      4
    ],
    "args": [
      "mobility_private-car-passengers"
    ],
    "operation": "question-answer-to-target-inverse",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "carshare_mobility_private-car-driving_amount": {
    "option": "carshare",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "carshare_mobility_car-sharing-driving_amount": {
    "option": "carshare",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "carshare_mobility_private-car-purchase_amount": {
    "option": "carshare",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "carshare_mobility_car-sharing-rental_amount": {
    "option": "carshare",
    "values": [
      1
    ],
    "args": [
      "mobility_car-sharing-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "carshare_mobility_private-car-maintenance_amount": {
    "option": "carshare",
    "values": [
      1
    ],
    "args": [
      "mobility_private-car-driving_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv_mobility_private-car-driving_intensity": {
    "option": "car-ev-phv",
    "values": [
      0.083547694
    ],
    "args": [
      "mobility_driving-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv_mobility_car-sharing-driving_intensity": {
    "option": "car-ev-phv",
    "values": [
      0.083547694
    ],
    "args": [
      "mobility_driving-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv_mobility_private-car-purchase_intensity": {
    "option": "car-ev-phv",
    "values": [
      8027.5
    ],
    "args": [
      "mobility_manufacturing-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv_mobility_car-sharing-rental_intensity": {
    "option": "car-ev-phv",
    "values": [
      8027.5
    ],
    "args": [
      "mobility_manufacturing-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv-re_mobility_private-car-driving_intensity": {
    "option": "car-ev-phv-re",
    "values": [
      0.025653594
    ],
    "args": [
      "mobility_driving-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv-re_mobility_car-sharing-driving_intensity": {
    "option": "car-ev-phv-re",
    "values": [
      0.025653594
    ],
    "args": [
      "mobility_driving-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv-re_mobility_private-car-purchase_intensity": {
    "option": "car-ev-phv-re",
    "values": [
      8027.5
    ],
    "args": [
      "mobility_manufacturing-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "car-ev-phv-re_mobility_car-sharing-rental_intensity": {
    "option": "car-ev-phv-re",
    "values": [
      8027.5
    ],
    "args": [
      "mobility_manufacturing-intensity"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_rice_amount": {
    "option": "vegan",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_bread-flour_amount": {
    "option": "vegan",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_noodle_amount": {
    "option": "vegan",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_potatoes_amount": {
    "option": "vegan",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_vegetables_amount": {
    "option": "vegan",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_processed-vegetables_amount": {
    "option": "vegan",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_beans_amount": {
    "option": "vegan",
    "values": [
      1
    ],
    "args": [
      "food_milk_amount",
      "food_other-dairy_amount",
      "food_eggs_amount",
      "food_beef_amount",
      "food_pork_amount",
      "food_chicken_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount",
      "food_fish_amount",
      "food_processed-fish_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_milk_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_other-dairy_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_eggs_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_beef_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_pork_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_chicken_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_other-meat_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_processed-meat_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_fish_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_processed-fish_amount": {
    "option": "vegan",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_ready-meal_intensity": {
    "option": "vegan",
    "values": [
      1
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_restaurant_intensity": {
    "option": "vegan",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegan_food_bar-cafe_intensity": {
    "option": "vegan",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_rice_amount": {
    "option": "vegetarian",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_bread-flour_amount": {
    "option": "vegetarian",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_noodle_amount": {
    "option": "vegetarian",
    "values": [
      -0.181818182
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_potatoes_amount": {
    "option": "vegetarian",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_vegetables_amount": {
    "option": "vegetarian",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_processed-vegetables_amount": {
    "option": "vegetarian",
    "values": [
      0.363636364
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_beans_amount": {
    "option": "vegetarian",
    "values": [
      0.357343288
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_chicken_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount",
      "food_fish_amount",
      "food_processed-fish_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_milk_amount": {
    "option": "vegetarian",
    "values": [
      1.142795285
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_chicken_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount",
      "food_fish_amount",
      "food_processed-fish_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_other-dairy_amount": {
    "option": "vegetarian",
    "values": [
      0.559975742
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_chicken_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount",
      "food_fish_amount",
      "food_processed-fish_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_eggs_amount": {
    "option": "vegetarian",
    "values": [
      0.22031977
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_chicken_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount",
      "food_fish_amount",
      "food_processed-fish_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_beef_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_pork_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_chicken_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_other-meat_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_processed-meat_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_fish_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_processed-fish_amount": {
    "option": "vegetarian",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_ready-meal_intensity": {
    "option": "vegetarian",
    "values": [
      1
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_restaurant_intensity": {
    "option": "vegetarian",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "vegetarian_food_bar-cafe_intensity": {
    "option": "vegetarian",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_beef_amount": {
    "option": "white-meat-fish",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_pork_amount": {
    "option": "white-meat-fish",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_chicken_amount": {
    "option": "white-meat-fish",
    "values": [
      0.5
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_other-meat_amount": {
    "option": "white-meat-fish",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_processed-meat_amount": {
    "option": "white-meat-fish",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_fish_amount": {
    "option": "white-meat-fish",
    "values": [
      0.25
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_processed-fish_amount": {
    "option": "white-meat-fish",
    "values": [
      0.25
    ],
    "args": [
      "food_beef_amount",
      "food_pork_amount",
      "food_other-meat_amount",
      "food_processed-meat_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_ready-meal_intensity": {
    "option": "white-meat-fish",
    "values": [
      1
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_restaurant_intensity": {
    "option": "white-meat-fish",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "white-meat-fish_food_bar-cafe_intensity": {
    "option": "white-meat-fish",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_rice_amount": {
    "option": "guide-meal",
    "values": [
      -0.293670587
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_bread-flour_amount": {
    "option": "guide-meal",
    "values": [
      -0.293670587
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_noodle_amount": {
    "option": "guide-meal",
    "values": [
      -0.293670587
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_potatoes_amount": {
    "option": "guide-meal",
    "values": [
      0.903789971
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_vegetables_amount": {
    "option": "guide-meal",
    "values": [
      0.112482714
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_processed-vegetables_amount": {
    "option": "guide-meal",
    "values": [
      0.112482714
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_beans_amount": {
    "option": "guide-meal",
    "values": [
      0.273319143
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_milk_amount": {
    "option": "guide-meal",
    "values": [
      0.992166427
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_other-dairy_amount": {
    "option": "guide-meal",
    "values": [
      0.992166427
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_eggs_amount": {
    "option": "guide-meal",
    "values": [
      0.383733338
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_beef_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_pork_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_chicken_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_other-meat_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_processed-meat_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_fish_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_processed-fish_amount": {
    "option": "guide-meal",
    "values": [
      -0.275049188
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_fruits_amount": {
    "option": "guide-meal",
    "values": [
      0.824468431
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_oil_amount": {
    "option": "guide-meal",
    "values": [
      -0.778043146
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_seasoning_amount": {
    "option": "guide-meal",
    "values": [
      -0.778043146
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_ready-meal_intensity": {
    "option": "guide-meal",
    "values": [
      1
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_restaurant_intensity": {
    "option": "guide-meal",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-meal_food_bar-cafe_intensity": {
    "option": "guide-meal",
    "values": [
      0.7157
    ],
    "args": [
      "food_rice",
      "food_bread-flour",
      "food_noodle",
      "food_potatoes",
      "food_vegetables",
      "food_processed-vegetables",
      "food_beans",
      "food_milk",
      "food_other-dairy",
      "food_eggs",
      "food_beef",
      "food_pork",
      "food_chicken",
      "food_other-meat",
      "food_processed-meat",
      "food_fish",
      "food_processed-fish",
      "food_fruits",
      "food_oil",
      "food_seasoning"
    ],
    "operation": "proportional-to-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-snack-drink_food_sweets-snack_amount": {
    "option": "guide-snack-drink",
    "values": [
      -0.778043146
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-snack-drink_food_alcohol_amount": {
    "option": "guide-snack-drink",
    "values": [
      -0.778043146
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "guide-snack-drink_food_cold-drink_amount": {
    "option": "guide-snack-drink",
    "values": [
      -0.110780984
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_rice_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_bread-flour_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_noodle_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_potatoes_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_vegetables_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_processed-vegetables_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_beans_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_milk_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_other-dairy_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_eggs_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_beef_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_pork_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_chicken_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_other-meat_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_processed-meat_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_fish_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_processed-fish_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_fruits_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_oil_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_seasoning_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_sweets-snack_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_ready-meal_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_alcohol_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_coffee-tea_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_cold-drink_amount": {
    "option": "loss",
    "values": [
      0.964320154
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "question-answer-to-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_restaurant_amount": {
    "option": "loss",
    "values": [
      -0.0229024
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "loss_food_bar-cafe_amount": {
    "option": "loss",
    "values": [
      -0.086631906
    ],
    "args": [
      "food_food-amount-to-average"
    ],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "seasonal_food_vegetables_intensity": {
    "option": "seasonal",
    "values": [
      0.956544981
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "seasonal_food_fruits_intensity": {
    "option": "seasonal",
    "values": [
      1.065918232
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "local_food_potatoes_intensity": {
    "option": "local",
    "values": [
      1.457994
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "local_food_vegetables_intensity": {
    "option": "local",
    "values": [
      1.201479752
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-accessory_other_clothes-goods_amount": {
    "option": "clothes-accessory",
    "values": [
      22.66259076
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-accessory_other_bags-jewelries-goods_amount": {
    "option": "clothes-accessory",
    "values": [
      3.899884319
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "electronics-furniture_other_electronics_amount": {
    "option": "electronics-furniture",
    "values": [
      6.412981837
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "electronics-furniture_other_furniture_amount": {
    "option": "electronics-furniture",
    "values": [
      1.359545846
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "electronics-furniture_other_covering_amount": {
    "option": "electronics-furniture",
    "values": [
      1.856600611
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_culture-goods_amount": {
    "option": "hobby",
    "values": [
      2.773967183
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_entertainment-goods_amount": {
    "option": "hobby",
    "values": [
      0.375954424
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_sports-goods_amount": {
    "option": "hobby",
    "values": [
      2.348030397
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_gardening-flower_amount": {
    "option": "hobby",
    "values": [
      3.044506981
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_pet_amount": {
    "option": "hobby",
    "values": [
      2.990918299
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "hobby_other_tobacco_amount": {
    "option": "hobby",
    "values": [
      2.834608006
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "consumables_other_cosmetics_amount": {
    "option": "consumables",
    "values": [
      6.50546099
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "consumables_other_sanitation_amount": {
    "option": "consumables",
    "values": [
      14.75682353
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "consumables_other_kitchen-goods_amount": {
    "option": "consumables",
    "values": [
      3.998600749
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "consumables_other_paper-stationery_amount": {
    "option": "consumables",
    "values": [
      1.213503091
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "books_other_books-magazines_intensity": {
    "option": "books",
    "values": [
      1.49788786
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_hotel_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_travel_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_culture-leisure_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_entertainment-leisure_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_sports-leisure_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "eco-tourism_other_bath-spa_amount": {
    "option": "eco-tourism",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_housing-maintenance_amount": {
    "option": "zeh",
    "values": [
      0.744995626
    ],
    "args": [],
    "operation": "increase-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_electricity_amount": {
    "option": "zeh",
    "values": [
      0.369,
      -0.2
    ],
    "args": [
      "housing_urban-gas_amount",
      "housing_lpg_amount",
      "housing_kerosene_amount",
      "housing_other-energy_amount"
    ],
    "operation": "shift-from-other-items-then-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_urban-gas_amount": {
    "option": "zeh",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_lpg_amount": {
    "option": "zeh",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_kerosene_amount": {
    "option": "zeh",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_other-energy_amount": {
    "option": "zeh",
    "values": [
      0
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "zeh_housing_electricity_intensity": {
    "option": "zeh",
    "values": [
      0.042861845
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "self-re_housing_electricity_intensity": {
    "option": "self-re",
    "values": [
      0.042861845
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "grid-re_housing_electricity_intensity": {
    "option": "grid-re",
    "values": [
      0.062972926
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_imputed-rent_amount": {
    "option": "com-house",
    "values": [
      21.3087466
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_rent_amount": {
    "option": "com-house",
    "values": [
      4.608658415
    ],
    "args": [],
    "operation": "absolute-target",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_land-rent_amount": {
    "option": "com-house",
    "values": [
      1
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_housing-maintenance_amount": {
    "option": "com-house",
    "values": [
      1
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_electricity_amount": {
    "option": "com-house",
    "values": [
      0.270333566
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_urban-gas_amount": {
    "option": "com-house",
    "values": [
      0.234432234
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_lpg_amount": {
    "option": "com-house",
    "values": [
      0.082599119
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "com-house_housing_kerosene_amount": {
    "option": "com-house",
    "values": [
      0.771779141
    ],
    "args": [
      "housing_imputed-rent_amount",
      "housing_rent_amount"
    ],
    "operation": "proportional-to-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "insrenov_housing_housing-maintenance_amount": {
    "option": "insrenov",
    "values": [
      -0.241929499
    ],
    "args": [
      "housing_electricity",
      "housing_urban-gas",
      "housing_lpg",
      "housing_kerosene"
    ],
    "operation": "rebound-from-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "insrenov_housing_electricity_amount": {
    "option": "insrenov",
    "values": [
      0.127762934
    ],
    "args": [
      "housing_housing-insulation-renovation"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "insrenov_housing_urban-gas_amount": {
    "option": "insrenov",
    "values": [
      0.234432234
    ],
    "args": [
      "housing_housing-insulation-renovation"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "insrenov_housing_lpg_amount": {
    "option": "insrenov",
    "values": [
      0.082599119
    ],
    "args": [
      "housing_housing-insulation-renovation"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "insrenov_housing_kerosene_amount": {
    "option": "insrenov",
    "values": [
      0.771779141
    ],
    "args": [
      "housing_housing-insulation-renovation"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-home_housing_electricity_amount": {
    "option": "clothes-home",
    "values": [
      0.127762934
    ],
    "args": [
      "housing_housing-insulation-clothing"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-home_housing_urban-gas_amount": {
    "option": "clothes-home",
    "values": [
      0.234432234
    ],
    "args": [
      "housing_housing-insulation-clothing"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-home_housing_lpg_amount": {
    "option": "clothes-home",
    "values": [
      0.082599119
    ],
    "args": [
      "housing_housing-insulation-clothing"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "clothes-home_housing_kerosene_amount": {
    "option": "clothes-home",
    "values": [
      0.771779141
    ],
    "args": [
      "housing_housing-insulation-clothing"
    ],
    "operation": "question-reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_housing-maintenance_amount": {
    "option": "ec",
    "values": [
      -0.077669903
    ],
    "args": [
      "housing_electricity",
      "housing_urban-gas",
      "housing_lpg",
      "housing_kerosene",
      "housing_other-energy"
    ],
    "operation": "rebound-from-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_electricity_amount": {
    "option": "ec",
    "values": [
      0.271666667
    ],
    "args": [
      "housing_urban-gas_amount",
      "housing_lpg_amount",
      "housing_kerosene_amount",
      "housing_other-energy_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_urban-gas_amount": {
    "option": "ec",
    "values": [
      -0.603785104
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_lpg_amount": {
    "option": "ec",
    "values": [
      -0.633259912
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_kerosene_amount": {
    "option": "ec",
    "values": [
      -0.228220859
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ec_housing_other-energy_amount": {
    "option": "ec",
    "values": [
      -0.939197668
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ac_housing_housing-maintenance_amount": {
    "option": "ac",
    "values": [
      -0.015345044
    ],
    "args": [
      "housing_electricity",
      "housing_urban-gas",
      "housing_lpg",
      "housing_kerosene"
    ],
    "operation": "rebound-from-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ac_housing_electricity_amount": {
    "option": "ac",
    "values": [
      0.2125
    ],
    "args": [
      "housing_urban-gas_amount",
      "housing_lpg_amount",
      "housing_kerosene_amount"
    ],
    "operation": "shift-from-other-items",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ac_housing_urban-gas_amount": {
    "option": "ac",
    "values": [
      -0.234432234
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ac_housing_lpg_amount": {
    "option": "ac",
    "values": [
      -0.082599119
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "ac_housing_kerosene_amount": {
    "option": "ac",
    "values": [
      -0.771779141
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "led_housing_electricity_amount": {
    "option": "led",
    "values": [
      -0.0660406
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "led_housing_housing-maintenance_amount": {
    "option": "led",
    "values": [
      0.020622194
    ],
    "args": [
      "housing_electricity"
    ],
    "operation": "further-reduction-from-other-footprints",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  },
  "enenudge_housing_electricity_amount": {
    "option": "enenudge",
    "values": [
      -0.03
    ],
    "args": [],
    "operation": "reduction-rate",
    "citation": "Koide et al. 2021. Environmental Research Letters 16 084001"
  }
}