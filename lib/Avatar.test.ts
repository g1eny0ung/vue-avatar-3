import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { render } from '@testing-library/vue'
import useLoaded from './useLoaded'

import Avatar from './Avatar.vue'

vi.mock('./useLoaded')

describe('Avatar', () => {
  it('renders a image correctly', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(true),
      }
    })
    const { container, getByRole } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByRole('img')).toHaveAttribute('src', 'https://fakeimg.pl/300/')
  })

  it('if the image is not loaded, it should render a letter avatar', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(false),
      }
    })
    const { container, getByText } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        name: 'John Doe',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByText('JD')).toBeInTheDocument()
    expect(getByText('JD')).toHaveStyle('color: #fff')
  })

  it('if only the name is provided, it should render a letter avatar', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(false),
      }
    })
    const { container, getByText } = render(Avatar, {
      props: {
        name: 'John Doe',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByText('JD')).toBeInTheDocument()
  })

  it('if bgColor is provided, it should render a letter avatar with the provided background color', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(false),
      }
    })
    const { container, getByText } = render(Avatar, {
      props: {
        name: 'John Doe',
        bgColor: '#ffffff',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByText('JD')).toHaveStyle('background-color: #ffffff')
    expect(getByText('JD')).toHaveStyle('color: #000')
  })

  it('variant: rounded', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(true),
      }
    })
    const { container } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        variant: 'rounded',
      },
    })

    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveStyle('border-radius: 8px')
  })

  it('variant: rounded + round 4px', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(true),
      }
    })
    const { container } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        variant: 'rounded',
        round: 4,
      },
    })

    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveStyle('border-radius: 4px')
  })

  it('variant: square', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(true),
      }
    })
    const { container } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        variant: 'square',
      },
    })

    expect(container).toMatchSnapshot()
    expect(container.firstChild).not.toHaveStyle('border-radius: 8px')
  })

  it('if fallback is false, it should not render a letter avatar when the image is not loaded', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(false),
      }
    })
    const { queryByText } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        name: 'John Doe',
        fallback: false,
      },
    })

    expect(queryByText('JD')).not.toBeInTheDocument()
  })
})
