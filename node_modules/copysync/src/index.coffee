fs = require 'fs'
path = require 'path'
mkdirp = require('mkdirp')

BUF_LENGTH = 64 * 1024
_buff = new Buffer(BUF_LENGTH)

copyFileSync = (srcFile, destFile) ->
  rfd = fs.openSync srcFile, "r"
  wfd = fs.openSync destFile, "w"

  bytesRead = 1
  pos = 0

  while bytesRead > 0
    bytesRead = fs.readSync(rfd, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync wfd, _buff, 0, bytesRead
    pos += bytesRead

  fs.closeSync rfd
  fs.closeSync wfd

cpr = (source, dest) ->

  statsSrc = fs.statSync source
  try
    statsDest = fs.statSync dest
  catch err
    if err.code? and err.code is 'ENOENT'
      statsDest = null
    else
      throw err

  if statsSrc.isFile()
    if statsDest is null or statsDest.isDirectory()
      dest = path.join(dest, path.basename source)
      copyFileSync source, dest
    else
      copyFileSync source, dest
  else
    if statsSrc.isDirectory()
      destPath = path.join(dest, path.basename source)
      mkdirp.sync destPath
      filenames = fs.readdirSync source
      for file in filenames
        cpr path.join(source, file), destPath

module.exports = cpr