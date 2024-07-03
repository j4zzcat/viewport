'use strict'

const multicastdns = require('multicast-dns')
const dnsEqual = require('./utils/dnsEqual')
const flatten = require('array-flatten').flatten
const helpers = require('./helpers.js')

const Server = function (opts) {
  this.mdns = multicastdns(opts)
  this.mdns.setMaxListeners(0)
  this.registry = {}
  this.mdns.on('query', this._respondToQuery.bind(this))
}

Server.prototype = {
  _respondToQuery: function (query) {
    for (let i = 0; i < query.questions.length; i++) {
      const question = query.questions[i]

      const type = question.type
      const name = question.name

      // generate the answers section
      const answers = type === 'ANY'
        ? flatten(Object.keys(this.registry).map(this._recordsFor.bind(this, name)), 1)
        : this._recordsFor(name, type)

      if (answers.length === 0) return

      // generate the additionals section
      let additionals = []
      if (type !== 'ANY') {
        answers.forEach(answer => {
          if (answer.type !== 'PTR') return
          additionals = additionals
            .concat(this._recordsFor(answer.data, 'SRV'))
            .concat(this._recordsFor(answer.data, 'TXT'))
        })

        // to populate the A and AAAA records, we need to get a set of unique
        // targets from the SRV record
        additionals
          .filter(record => {
            return record.type === 'SRV'
          })
          .map(record => {
            return record.data.target
          })
          .filter(helpers.unique())
          .forEach(target => {
            additionals = additionals
              .concat(this._recordsFor(target, 'A'))
              .concat(this._recordsFor(target, 'AAAA'))
          })
      }

      this.mdns.respond({
        answers,
        additionals
      }, err => {
        if (err) throw err // TODO: Handle this (if no callback is given, the error will be ignored)
      })
    }
  },

  register: function (records) {
    if (!Array.isArray(records)) { records = [records] }

    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      let subRegistry = this.registry[record.type]

      if (!subRegistry) {
        subRegistry = this.registry[record.type] = []
      } else if (subRegistry.some(helpers.isDuplicateRecord(record))) {
        continue
      }

      subRegistry.push(record)
    }
  },

  unregister: function (records) {
    if (!Array.isArray(records)) { records = [records] }

    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      const type = record.type

      if (!(type in this.registry)) { continue }

      this.registry[type] = this.registry[type].filter(r => {
        return r.name !== record.name
      })
    }
  },

  _recordsFor: function (name, type) {
    if (!(type in this.registry)) { return [] }

    return this.registry[type].filter(record => {
      const recordName = ~name.indexOf('.') ? record.name : record.name.split('.')[0]
      return dnsEqual(recordName, name)
    })
  }

}

module.exports = Server
