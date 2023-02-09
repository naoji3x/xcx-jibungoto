import BlockType from '../../extension-support/block-type'
import ArgumentType from '../../extension-support/argument-type'
import Cast from '../../util/cast'
import translations from './translations.json'
import blockIcon from './block-icon.png'
import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from './mobility/private-car-driving'

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = (messageData) => messageData.defaultMessage

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
  const localeSetup = formatMessage.setup()
  if (localeSetup && localeSetup.translations[localeSetup.locale]) {
    Object.assign(
      localeSetup.translations[localeSetup.locale],
      translations[localeSetup.locale]
    )
  }
}

const EXTENSION_ID = 'jibungotoPlanet'

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL =
  'https://naoji3x.github.io/xcx-jibungoto/dist/jibungotoPlanet.mjs'

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class ExtensionBlocks {
  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return formatMessage({
      id: 'jibungotoPlanet.name',
      default: 'Jibungoto Planet',
      description: 'name of the extension'
    })
  }

  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return EXTENSION_ID
  }

  /**
   * URL to get this extension.
   * @type {string}
   */
  static get extensionURL() {
    return extensionURL
  }

  /**
   * Set URL to get this extension.
   * The extensionURL will be changed to the URL of the loading server.
   * @param {string} url - URL
   */
  static set extensionURL(url) {
    extensionURL = url
  }

  /**
   * Construct a set of blocks for Jibungoto Planet.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime

    if (runtime.formatMessage) {
      // Replace 'formatMessage' to a formatter which is used in the runtime.
      formatMessage = runtime.formatMessage
    }
  }

  privateCarDriving(args) {
    const carIntensityFactorFirstKey = Cast.toString(
      args.carIntensityFactorFirstKey
    )
    const carChargingKey = Cast.toString(args.carChargingKey)
    const electricityIntensityKey = Cast.toString(args.electricityIntensityKey)
    const carPassengersFirstKey = Cast.toString(args.carPassengersFirstKey)
    const privateCarAnnualMileage = Cast.toNumber(args.privateCarAnnualMileage)

    return (
      estimatePrivateCarDrivingAmount(privateCarAnnualMileage) *
      estimatePrivateCarDrivingIntensity(
        carIntensityFactorFirstKey,
        carPassengersFirstKey,
        carChargingKey,
        electricityIntensityKey
      )
    )
  }

  menuItem(item, defaultMessage) {
    return {
      value: item,
      text: formatMessage({
        id: 'jibungotoPlanet.' + item,
        default: defaultMessage
      })
    }
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    setupTranslations()
    return {
      id: ExtensionBlocks.EXTENSION_ID,
      name: ExtensionBlocks.EXTENSION_NAME,
      extensionURL: ExtensionBlocks.extensionURL,
      blockIconURI: blockIcon,
      showStatusButton: false,
      blocks: [
        {
          opcode: 'private-car-driving',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.privateCarDriving',
            default:
              'private car driving(kgCO2e): ' +
              'car type[carIntensityFactorFirstKey] ' +
              'car passengers[carPassengersFirstKey] ' +
              'car charging[carChargingKey] ' +
              'car charging type[electricityIntensityKey] ' +
              'annual mileage[privateCarAnnualMileage]',
            description: 'estimate Private car driving footprint'
          }),
          func: 'privateCarDriving',
          arguments: {
            carIntensityFactorFirstKey: {
              type: ArgumentType.STRING,
              menu: 'carIntensityFactorFirstKey',
              defaultValue: 'gasoline'
            },
            carPassengersFirstKey: {
              type: ArgumentType.STRING,
              menu: 'carPassengersFirstKey',
              defaultValue: '1'
            },
            carChargingKey: {
              type: ArgumentType.STRING,
              menu: 'carChargingKey',
              defaultValue: 'unknown'
            },
            electricityIntensityKey: {
              type: ArgumentType.STRING,
              menu: 'electricityIntensityKey',
              defaultValue: 'unknown'
            },
            privateCarAnnualMileage: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }
      ],
      menus: {
        carIntensityFactorFirstKey: {
          acceptReporters: false,
          items: [
            this.menuItem('gasoline', 'Gasoline'),
            this.menuItem('light', 'Light car'),
            this.menuItem('hv', 'HV'),
            this.menuItem('phv', 'PHV'),
            this.menuItem('ev', 'EV'),
            this.menuItem('unknown', 'Unknown')
          ]
        },
        carChargingKey: {
          acceptReporters: false,
          items: [
            this.menuItem('charge-almost-at-home', 'Charge almost at home'),
            this.menuItem(
              'use-charging-spots-occasionally',
              'Use charging spots occasionally'
            ),
            this.menuItem(
              'use-charging-spots-sometimes',
              'Use charging spots sometimes'
            ),
            this.menuItem(
              'use-charging-spots-usually',
              'Use charging spots usually'
            ),
            this.menuItem('unknown', 'Unknown')
          ]
        },
        electricityIntensityKey: {
          acceptReporters: false,
          items: [
            this.menuItem('conventional', 'Conventional'),
            this.menuItem('30-renewable', '30% renewable'),
            this.menuItem('50-renewable', '50% renewable'),
            this.menuItem('100-renewable', '100% renewable'),
            this.menuItem('solar-panel', 'Solar panel'),
            this.menuItem('unknown', 'Unknown')
          ]
        },
        carPassengersFirstKey: {
          acceptReporters: false,
          items: [
            this.menuItem('1', '1'),
            this.menuItem('1-2', '1-2'),
            this.menuItem('2', '2'),
            this.menuItem('2-3', '2-3'),
            this.menuItem('3', '3'),
            this.menuItem('3-4', '3-4'),
            this.menuItem('4-more', '4 or more'),
            this.menuItem('unknown', 'Unknown')
          ]
        }
      }
    }
  }
}

export { ExtensionBlocks as default, ExtensionBlocks as blockClass }
