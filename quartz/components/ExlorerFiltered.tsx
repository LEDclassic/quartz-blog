import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { FileTrieNode } from "../util/fileTrie"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"

// 1. filterFn 수정해서 "hidden-ko" 태그가 포함된 파일 필터링
// 2. 하위 항목 안보이게 하려면 mapFn에서 node.children 필터
// 3. 특정 폴더 defaultState 다르게 설정

const filterFn = (node: FileTrieNode) => {
  const tags = node.page?.frontmatter?.tags ?? []
  return !tags.includes("hidden-ko") && node.slugSegment !== "tags"
}

const mapFn = (node: FileTrieNode) => {
  // 하위 항목도 ko 번역 페이지는 제거
  if (node.children) {
    node.children = node.children.filter(
      (child) => !child.page?.frontmatter?.tags?.includes("hidden-ko")
    )
  }
  return node
}

const sortFn = (a: FileTrieNode, b: FileTrieNode) => {
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  if (!a.isFolder && b.isFolder) {
    return 1
  } else {
    return -1
  }
}

const ExplorerFiltered: QuartzComponentConstructor = () => {
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const Explorer: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
    return (
      <div
        class={classNames(displayClass, "explorer")}
        data-behavior="link"
        data-collapsed="collapsed"
        data-savestate={true}
        data-data-fns={JSON.stringify({
          order: ["filter", "map", "sort"],
          filterFn: filterFn.toString(),
          mapFn: mapFn.toString(),
          sortFn: sortFn.toString(),
        })}
      >
        <button
          type="button"
          class="explorer-toggle mobile-explorer hide-until-loaded"
          data-mobile={true}
          aria-controls="explorer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          class="title-button explorer-toggle desktop-explorer"
          data-mobile={false}
          aria-expanded={true}
        >
          <h2>{i18n(cfg.locale).components.explorer.title}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="5 8 14 8">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div id="explorer" class="explorer-content" aria-expanded={false} role="group">
          <OverflowList class="explorer-ul" />
        </div>
      </div>
    )
  }

  Explorer.css = style
  Explorer.afterDOMLoaded = concatenateResources(script, overflowListAfterDOMLoaded)
  return Explorer
}

export default ExplorerFiltered
