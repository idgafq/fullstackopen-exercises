const { test, expect, beforeEach, describe } = require('@playwright/test')
const { initialBlogs, loginWith, createBlog } = require('./helper')
const axios = require('axios')

describe('bloglist', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Comic Sans',
        username: 'sansc',
        password: 'wordp'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
    const textboxes = await page.getByRole('textbox').all()
    expect(textboxes.length).toBe(2)
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'nameuser', 'wordpass')

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
        const blog = { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/'}
        await createBlog(page, blog)

        const blogElement = page.getByText(`${blog.title} ${blog.author}`).locator('..')
        await blogElement.getByRole('button', { name: 'view' }).click()
        await expect(blogElement.getByText(blog.url)).toBeVisible()
    })

    test('likes are updated correctly', async ({ page }) => {
      const blog = { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/'}
      await createBlog(page, blog)

      const blogElement = page.getByText(`${blog.title} ${blog.author}`).locator('..')
      await blogElement.getByRole('button', { name: 'view' }).click()
      await blogElement.getByRole('button', { name: 'like' }).click()
      await expect(blogElement.getByText('likes 1')).toBeVisible()
      await expect(blogElement).toContainText('Matti Luukkainen')
      await blogElement.getByRole('button', { name: 'like' }).click()
      await blogElement.getByText('likes 2').waitFor()
      await blogElement.getByRole('button', { name: 'like' }).click()
      await expect(blogElement.getByText('likes 3')).toBeVisible()
    })

    test('blog can be removed by user who added it', async ({ page }) => {

      const blog = { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/' }
      await createBlog(page, blog)
      await page.waitForTimeout(5000)

      const blogElement = page.getByText(`${blog.title} ${blog.author}`).locator('..')
      await blogElement.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Remove')
        await dialog.accept()
      })
      await blogElement.getByRole('button', { name: 'remove' }).click()
      await page.waitForTimeout(1000)

      expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
    })

    test('remove button visible only if user added the blog', async ({ page }) => {
      const blog = { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/' }
      await createBlog(page, blog)

      const blogElement = page.getByText(`${blog.title} ${blog.author}`).locator('..')
      await blogElement.getByRole('button', { name: 'view' }).click()
      await expect(blogElement.getByRole('button', { name: 'remove' })).toBeVisible()
      
      await page.getByRole('button', {name: 'logout'}).click()
      await loginWith(page, 'sansc', 'wordp')

      const sameBlogElement = page.getByText(`${blog.title} ${blog.author}`).locator('..')
      await blogElement.getByRole('button', { name: 'view' }).click()
      await expect(sameBlogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })

  describe('Database has multiple blog entries', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await page.waitForTimeout(1000)
      const local = await page.evaluate(() => JSON.parse(localStorage.getItem('userLoggedinInfo')))
      const token = local.token
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      try {
        for (let i = 0; i < initialBlogs.length; i++) {
          await axios.post('http://localhost:3001/api/blogs', initialBlogs[i], config)
        }
      } catch (exception) {
        throw exception;
      }
      await page.reload()
    })

    test('blogs are ordered by descending likes', async ({ page }) => {
      await page.waitForSelector('.blog')
      const blogs = await page.locator('.blog').all()
      const likes = []

      for (let blogElement of blogs) {
        await blogElement.getByRole('button', { name: 'view' }).click()
        const likeElement = await blogElement.locator('.likes')
        const text = await likeElement.textContent()
        const likesNum = parseInt(text.replace('likes ', ''  ))
        likes.push(likesNum)
      }
      let isDescending = true
      for (let i = 0; i < likes.length -1; i++) {
        if (likes[i] < likes[i+1]) {
          isDescending = false
          break
        }
      }
      expect(isDescending).toBe(true)
    })
  })
})