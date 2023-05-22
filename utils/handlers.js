import log from './log.js'

// Handling DB connect
export const handleSuccessConnect = () => log.success('Database connected\n')
export const handleErrorConnect = (error) => log.error('Database connection error', error)
