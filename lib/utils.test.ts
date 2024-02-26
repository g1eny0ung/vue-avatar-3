import { describe, it, expect } from 'vitest'
import { stringAvatar } from './utils'

describe('utils', () => {
  it('stringAvatar', () => {
    expect(stringAvatar('John Doe').children).toBe('JD')
    expect(stringAvatar('Foo').children).toBe('F')
  })
})
