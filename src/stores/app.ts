import { ref } from 'vue'
import { defineStore } from 'pinia'

const LOCALSTORAGE_APP_SIDEBAR_COLLAPSE = 'app.admin.sidebar.collapse'

interface IPageMeta {
  title: string
  breadcrumbs: string[]
}

export const useAppStore = defineStore('app', () => {
  const appName = ref('Boilerplate VueJS')

  const pageTitle = ref('Boilerplate VueJS')
  const breadcrumbs = ref(['Home', 'Dashboard V1'])

  const appLogo = ref('/adminlte/dist/img/AdminLTELogo.png')

  const defaultSidebarCollapse: boolean = localStorage.getItem(LOCALSTORAGE_APP_SIDEBAR_COLLAPSE) === 'true'
  const sidebarCollapse = ref(defaultSidebarCollapse)

  const setPageMeta = (pageMeta: IPageMeta) => {
    pageTitle.value = pageMeta.title
    breadcrumbs.value = pageMeta.breadcrumbs
  }

  const changeSidebarCollapse = (newValue: boolean) => {
    localStorage.setItem(LOCALSTORAGE_APP_SIDEBAR_COLLAPSE, newValue ? 'true' : 'false')
    sidebarCollapse.value = newValue
  }

  const changeLogo = (logo: string) => {
    appLogo.value = logo
  }
  const changeAppName = (name: string) => {
    appName.value = name
  }

  return {
    appName,
    breadcrumbs,
    pageTitle,
    appLogo,
    sidebarCollapse,
    setPageMeta,
    changeSidebarCollapse,
    changeLogo,
    changeAppName
  }
})
