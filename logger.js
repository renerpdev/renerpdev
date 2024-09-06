import winston from "winston"

const { combine, timestamp, json, colorize, simple } = winston.format

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(simple(), colorize({ all: true }))
    })
  ]
})

export { logger }
