import $ from 'jquery'
import { ROUTE_NAME } from '../../router'

/**
 * フォルダ一覧メニューのイベントハンドラ
 */
export const folderListMenuHandler = {
  /**
   * 全て開くリンククリックイベントハンドラ
   *  - 全てのフォルダを開く
   * @param {object} _this 
   */
  handleOpenAllClick(_this) {
    const folders = changeFolderOpenStatus(_this.list.folders, true)
    _this.$set(_this.list, 'folders', folders)
  },
  /**
   * 全て閉じるリンククリックイベントハンドラ
   *  - 全てのフォルダを閉じる
   * @param {object} _this 
   */
  handleCloseAllClick(_this) {
    const folders = changeFolderOpenStatus(_this.list.folders, false)
    _this.$set(_this.list, 'folders', folders)
  },

  /**
   * 新規作成リンクのクリックイベントハンドラ
   *  - 新規作成ダイアログを表示する
   * @param {object} _this 
   */
  handleFolderCreateClick(_this) {
    _this.dialog.folderCreate.visible = true
  },

  /**
   * 設定リンクのクリックイベントハンドラ
   *  - 設定ダイアログを表示する
   * @param {object} _this 
   */
  handleSettingClick(_this) {
    _this.$set(_this.dialog, 'setting', {
      visible: true,
      folders: _this.list.folders
    })
  }
}

/**
 * フォルダ一覧のイベントハンドラ
 */
export const folderListHandler = {
  /**
   * フォルダ名のクリックイベントハンドラ
   *  - フォルダの開閉を切り替える
   * @param {object} _this 
   * @param {string} folderId フォルダID
   */
  handleFolderNameClick(_this, folderId) {
    const folder = _this.list.folders.find(f => f.folderId === folderId)
    if (!folder) return
    folder.opened = !folder.opened
  },

  /**
   * ファイル作成ボタンのクリックイベントハンドラ
   * @param {object} _this 
   * @param {string} folderId フォルダID
   */
  handleFileCreateClick(_this, folderId) {
    _this.$router.push({
      name: ROUTE_NAME.DOCUMENT,
      params: {
        teamId: _this.$store.state.common.header.team.current,
        projectId: _this.$store.state.common.header.project.current
      }
    })

    _this.display.view.documentId = ''

    _this.display.editable = true
    _this.display.edit.isNew = true
    _this.display.edit.folderId = folderId
  },

  /**
   * フォルダ設定アイコンのクリックイベントハンドラ
   * @param {object} _this 
   * @param {string} folderId フォルダID
   */
  handleFolderSettingClick(_this, folderId) {
    const folder = _this.list.folders.find(f => f.folderId === folderId)
    if (!folder) return
    _this.dialog.folderSetting.folderId = folderId
    _this.dialog.folderSetting.folderName = folder.folderName
    _this.dialog.folderSetting.files = folder.files
    _this.dialog.folderSetting.visible = true
  }
}

/**
 * ドキュメント閲覧のイベントハンドラ
 */
export const documentViewHandler = {
  /**
   * 編集アイコンのクリックイベントハンドラ
   *  - 編集画面を表示する
   * @param {object} _this 
   */
  handleDocumentEditClick(_this) {
    _this.display.edit.documentName = _this.display.view.documentName
    _this.display.edit.content = _this.display.view.content
    _this.display.editable = true
  },

  /**
   * 複製ボタンのクリックイベントハンドラ
   *  - ファイルを同フォルダにコピーする
   * @param {object} _this 
   */
  handleDocumentDuplicateClick(_this) {
    const documentId = _this.display.view.documentId
    const documentName = _this.display.view.documentName
    const content = _this.display.view.content

    let currentFolder = null
    _this.list.folders.some(folder => {
      const targetFile = folder.files.find(file => file.fileId === documentId)
      if (targetFile) currentFolder = folder
    })

    if (!currentFolder) return

    // TODO APIでドキュメントを登録

    const _folders = _this.list.folders
    _folders.some(folder => {
      if (folder.folderId === currentFolder.folderId) {
        folder.files.push({
          fileId: '1000', // TODO APIの結果を使用する
          fileName: documentName
        })
      }
    })

    _this.$set(_this.list, 'folders', _folders)

    _this.$router.push({
      name: ROUTE_NAME.DOCUMENT_FILE,
      params: {
        teamId: _this.$store.state.common.header.team.current,
        projectId: _this.$store.state.common.header.project.current,
        fileId: '1000' // TODO APIの結果を使用する
      }
    })
  },

  /**
   * 削除アイコンのクリックイベントハンドラ
   *  - 削除確認画面を表示する
   * @param {object} _this 
   */
  handleDocumentDeleteClick(_this) {
    _this.dialog.fileDeleteConfirm.visible = true
  },

  /**
   * コンパイル済みテキストが変更された際のイベントハンドラ
   */
  handleCompiledMarkdownChange() {
    // アンカーにtarget=_blankを付与
    setTargetBlankAttr()
  }
}

/**
 * ドキュメント編集のイベントハンドラ
 */
export const documentEditorHandler = {
  /**
   * ドキュメント更新ボタンのクリックイベントハンドラ
   *  - ドキュメントの更新を行う
   * @param {object} _this 
   */
  handleEditorUpdateClick(_this) {
    _this.display.view.documentName = _this.display.edit.documentName
    _this.display.view.content = _this.display.edit.content
    _this.display.editable = false
    // TODO APIでドキュメント情報を更新
  },

  /**
   * ドキュメント取消ボタンのクリックイベントハンドラ
   *  - ドキュメントの状態を閲覧に変更する
   * @param {object} _this 
   */
  handleEditorCancelClick(_this) {
    _this.display.editable = false
  },

  /**
   * ドキュメント作成時の作成ボタンのクリックイベントハンドラ
   *  - ドキュメントの作成を行う
   * @param {object} _this 
   */
  handleEditorNewCreateClick(_this) {
    // TODO APIでドキュメント情報を登録

    const _folders = _this.list.folders
    _folders.some(folder => {
      if (folder.folderId === _this.display.edit.folderId) {
        folder.files.unshift({
          fileId: '0', // TODO ドキュメントIDをAPIの登録結果から設定
          fileName: _this.display.edit.documentName
        })
      }
    })

    _this.$router.push({
      name: ROUTE_NAME.DOCUMENT_FILE,
      params: {
        teamId: _this.$store.state.common.header.team.current,
        projectId: _this.$store.state.common.header.project.current,
        fileId: '0' // TODO ドキュメントIDをAPIの登録結果から設定
      }
    })

    _this.display.view.documentName = _this.display.edit.documentName
    _this.display.view.content = _this.display.edit.content
    _this.display.editable = false
  },

  /**
   * ドキュメント作成時の取消ボタンのクリックイベントハンドラ
   *  - ドキュメントの作成を中止し、ドキュメント画面へ遷移する
   * @param {object} _this 
   */
  handleEditorNewCancelClick(_this) {
    _this.display.editable = false
  },

  /**
   * プレビュー表示ボタンのクリックイベントハンドラ
   *  - スプレッドビューの状態をtrueに変更する
   * @param {object} _this 
   */
  handlePreviewOpenClick(_this) {
    _this.display.edit.isSpread = true
  },

  /**
   * プレビュー非表示ボタンのクリックイベントハンドラ
   *  - スプレッドビューの状態をfalseに変更する
   * @param {object} _this 
   */
  handlePreviewCloseClick(_this) {
    _this.display.edit.isSpread = false
  },

  /**
   * コンパイル済みテキストが変更された際のイベントハンドラ
   */
  handleEditorCompiledMarkdownChange() {
    // アンカーにtarget=_blankを付与
    setTargetBlankAttr()
  },

  /**
   * ドキュメントの状態の変更イベントハンドラ
   *  - 編集フォームを初期化する
   * @param {object} _this 
   * @param {boolean} editable ドキュメントの状態
   */
  handleDisplayEditableChange(_this, editable) {
    if (editable === true) return
    _this.$set(_this.display, 'edit', {
      isNew: false,
      folderId: '',
      documentId: '',
      documentName: '',
      content: '',
      isSpread: false
    })
  }
}

/**
 * 設定ダイアログのイベントハンドラ
 */
export const settingDialogHandler = {

  /**
   * 設定ダイアログの閉じるアイコンクリックイベントハンドラ
   *  - 設定ダイアログを非表示にする
   * @param {object} _this 
   */
  handleSettingCloseClick(_this) {
    closeSettingDialog(_this)
  },

  /**
   * 設定ダイアログの更新ボタンクリックイベントハンドラ
   *  - 設定ダイアログのフォルダの状態をリストに反映する
   * @param {object} _this 
   */
  handleSettingSaveClick(_this) {
    // 全てのフォルダを閉じた状態に変更
    const _folders = changeFolderOpenStatus(_this.dialog.setting.folders, false)
    _this.$set(_this.list, 'folders', _folders)

    closeSettingDialog(_this)
    // TODO APIでフォルダの順序を更新
  },

  /**
   * 設定ダイアログの取消ボタンクリックイベントハンドラ
   *  - 設定ダイアログを非表示にする
   * @param {object} _this 
   */
  handleSettingCancelClick(_this) {
    closeSettingDialog(_this)
  },

  /**
   * 設定ダイアログの表示フラグの変更イベントハンドラ
   *  - 設定ダイアログの状態を初期化する
   * @param {object} _this 
   * @param {boolean} visible 変更後の表示フラグ
   */
  handleSettingVisibleChange(_this, visible) {
    if (visible === true) return
    _this.$set(_this.dialog, 'setting', {
      ..._this.dialog.setting,
      folders: []
    })
  }
}

/**
 * フォルダ作成ダイアログのイベントハンドラ
 */
export const folderCreateDialogHandler = {
  /**
   * フォルダ作成の閉じるボタンクリックイベントハンドラ
   * @param {object} _this 
   */
  handleFolderCreateCloseClick(_this) {
    closeFolderCreateDialog(_this)
  },

  /**
   * フォルダ作成の作成ボタンクリックイベントハンドラ
   *  - 新規フォルダをフォルダリストに追加する
   * @param {object} _this 
   */
  handleFolderCreateSaveClick(_this) {
    // エラーメッセージを初期化
    _this.dialog.folderCreate.errorMessage = ''

    // エラーチェック：必須チェック
    if (_this.dialog.folderCreate.folderName.length === 0) {
      _this.dialog.folderCreate.errorMessage = 'フォルダ名を入力してください。'
      return
    }

    if (_this.dialog.folderCreate.folderName === '') return
    _this.list.folders.push({
      folderId: '', // TODO APIの結果を使用
      folderName: _this.dialog.folderCreate.folderName,
      files: [],
      errorMessage: ''
    })

    // TODO APIでフォルダを登録

    closeFolderCreateDialog(_this)
  },

  /**
   * フォルダ作成の取消ボタンクリックイベントハンドラ
   * @param {object} _this 
   */
  handleFolderCreateCancelClick(_this) {
    closeFolderCreateDialog(_this)
  },

  /**
   * フォルダダイアログの表示フラグ変更イベントハンドラ
   *  - フォルダが閉じられた場合にフォルダ名を空にする
   * @param {boolean} visible 変更後の表示フラグ
   */
  handleFolderCreateDialogVisibleChange(_this, visible) {
    if (visible === false) {
      _this.dialog.folderCreate.folderName = ''
    }
  }
}

/**
 * フォルダ設定ダイアログのイベントハンドラ
 */
export const folderSettingDialogHandler = {
  /**
   * フォルダ設定ダイアログの閉じるアイコンクリックイベントハンドラ
   *  - フォルダ設定ダイアログを非表示にする
   * @param {object} _this 
   */
  handleFolderSettingCloseClick(_this) {
    closeFolderSettingDialog(_this)
  },

  /**
   * 更新ボタンのクリックイベントハンドラ
   *  - 選択されたフォルダの情報をダイアログのオブジェクトに設定
   * @param {object} _this 
   */
  handleFolderSettingSaveClick(_this) {
    // エラーメッセージを初期化
    _this.dialog.folderSetting.errorMessage = ''

    // エラーチェック：必須チェック
    if (_this.dialog.folderSetting.folderName.length === 0) {
      _this.dialog.folderSetting.errorMessage = 'フォルダ名を入力してください。'
      return
    }

    // 更新用のフォルダリストを作成
    const _folders = _this.list.folders.map(folder => {
      if (folder.folderId !== _this.dialog.folderSetting.folderId) return folder
      const _folder = {
        ...folder,
        folderName: _this.dialog.folderSetting.folderName,
        files: _this.dialog.folderSetting.files
      }
      return _folder
    })
    _this.$set(_this.list, 'folders', _folders)

    closeFolderSettingDialog(_this)

    // TODO:APIでフォルダ情報を更新
  },

  /**
   * フォルダ設定ダイアログの取消ボタンクリックイベントハンドラ
   *  - フォルダ設定ダイアログを非表示にする
   * @param {object} _this 
   */
  handleFolderSettingCancelClick(_this) {
    closeFolderSettingDialog(_this)
  },

  /**
   * フォルダ設定の削除ボタンのクリックイベントハンドラ
   *  - フォルダ設定の削除確認を表示する
   * @param {object} _this 
   */
  handleFolderSettingDeleteClick(_this) {
    _this.dialog.folderSetting.deleteConfirm.visible = true
  },

  /**
   * フォルダ設定の削除実行ボタンのクリックイベントハンドラ
   *  - フォルダを削除する
   * @param {object} _this 
   */
  handleFolderSettingDeleteSubmitClick(_this) {
    const _folders = _this.list.folders
    _folders.some((folder, i) => {
      if (folder.folderId === _this.dialog.folderSetting.folderId) {
        _folders.splice(i, 1)
      }
    })

    _this.$set(_this.list, 'folders', _folders)

    // TODO APIでフォルダを削除

    closeFolderSettingDialog(_this)

    _this.$router.push({
      name: ROUTE_NAME.DOCUMENT,
      params: {
        teamId: _this.$store.state.common.header.team.current,
        projectId: _this.$store.state.common.header.project.current
      }
    })
  },

  /**
   * フォルダ設定の削除確認取消ボタンのクリックイベントハンドラ
   *  - フォルダ設定の削除確認を非表示にする
   * @param {object} _this 
   */
  handleFolderSettingDeleteCancelClick(_this) {
    _this.dialog.folderSetting.deleteConfirm.visible = false
  },

  /**
   * フォルダ設定ダイアログの表示フラグ変更イベントハンドラ
   *  - フォルダ設定が閉じられた場合に状態を初期化する
   * @param {object} _this 
   * @param {boolean} visible ダイアログの表示フラグ
   */
  handleFolderSettingVisibleChange(_this, visible) {
    if (visible === false) {
      // ダイアログの状態を初期化
      _this.$set(_this.dialog, 'folderSetting', {
        ..._this.dialog.folderSetting,
        folderId: '',
        folderName: '',
        files: [],
        deleteConfirm: {
          visible: false
        },
        errorMessage: ''
      })
    }
  }
}

/**
 * ファイル削除確認ダイアログのイベントハンドラ
 */
export const fileDeleteConfirmDialogHandler = {
  /**
   * ファイル削除確認の閉じるボタンクリックイベントハンドラ
   * @param {object} _this 
   */
  handleFileDeleteComfirmCloseClick(_this) {
    closeFileDeleteComfirmDialog(_this)
  },

  /**
   * ファイル削除確認の削除ボタンクリックイベントハンドラ
   *  - フォルダをリストから削除する
   * @param {object} _this 
   */
  handleFileDeleteComfirmSubmitClick(_this) {
    const fileId = _this.display.view.documentId
    const _folders = _this.list.folders
    let folderId = null

    _folders.some(folder => {
      folder.files.some((file, i) => {
        if (file.fileId === fileId) {
          folder.files.splice(i, 1)
          folderId = folder.folderId
        }
      })
    })

    _this.$set(_this.list, 'folders', _folders)

    closeFileDeleteComfirmDialog(_this)

    // TODO APIでファイルを削除

    const targetFolder = _folders.find(folder => folder.folderId === folderId)
    if (targetFolder && targetFolder.files.length !== 0) {
      const targetFileId = targetFolder.files[0].fileId
      _this.$router.push({
        name: ROUTE_NAME.DOCUMENT_FILE,
        params: {
          teamId: _this.$store.state.common.header.team.current,
          projectId: _this.$store.state.common.header.project.current,
          fileId: targetFileId
        }
      })
    } else {
      _this.$router.push({
        name: ROUTE_NAME.DOCUMENT,
        params: {
          teamId: _this.$store.state.common.header.team.current,
          projectId: _this.$store.state.common.header.project.current
        }
      })
    }
  },

  /**
   * ファイル削除確認の取消ボタンクリックイベントハンドラ
   * @param {object} _this 
   */
  handleFileDeleteComfirmCancelClick(_this) {
    closeFileDeleteComfirmDialog(_this)
  }
}

/**
 * ライフサイクルイベントハンドラ
 */
export const lifeCycleHandler = {
  /**
   * 画面の描画イベントハンドラ
   * @param {object} _this 
   */
  handleCreate(_this) {
    // フォルダの開閉状態の初期化を行う
    setInitialFolderOpenStatus(_this, _this.$route)
    // ファイルを表示する
    setDocument(_this, _this.$route)
    // アンカーにtarget=_blankを付与
    setTargetBlankAttr()
  }
}

/**
 * ルートのイベントハンドラ
 */
export const routeHandler = {
  /**
   * ルートの変更イベントハンドラ
   * @param {object} _this 
   */
  handleRouteChange(_this, route) {
    // フォルダの開閉状態の初期化を行う
    setInitialFolderOpenStatus(_this, route)
    // ファイルを表示する
    setDocument(_this, route)
  }
}

/**
 * 全てのフォルダの開閉状態を変更する
 * @param {array} folders フォルダ一覧
 * @param {boolean} opened 開閉状態
 */
const changeFolderOpenStatus = (folders, opened) => {
  return folders.map(folder => {
    return {
      ...folder,
      opened: opened
    }
  })
}

/**
 * アンカーに別タブで開く属性を付与する
 */
const setTargetBlankAttr = () => {
  window.setTimeout(() => {
    $("a[href^='http']:not([href*='" + location.hostname + "'])").attr('target', '_blank')
  }, 200)
}

/**
 * 設定ダイアログを閉じる
 * @param {object} _this 
 */
const closeSettingDialog = _this => {
  _this.dialog.setting.visible = false
}

/**
 * フォルダ作成ダイアログを閉じる
 * @param {object} _this 
 */
const closeFolderCreateDialog = _this => {
  _this.dialog.folderCreate.visible = false
}

/**
 * フォルダ設定ダイアログを閉じる
 * @param {object} _this 
 */
const closeFolderSettingDialog = _this => {
  _this.dialog.folderSetting.visible = false
}

/**
 * ファイル削除確認ダイアログを閉じる
 * @param {object} _this 
 */
const closeFileDeleteComfirmDialog = _this => {
  _this.dialog.fileDeleteConfirm.visible = false
}

/**
 * フォルダの開閉状態を初期化する
 * @param {object} _this 
 * @param {object} route VueRouterのルートオブジェクト
 */
const setInitialFolderOpenStatus = (_this, route) => {
  // フォルダの開閉状態を初期化
  const currentDocId = route.params.fileId
  if (!currentDocId) return

  _this.display.view.documentId = currentDocId

  const _folders = _this.list.folders.map(folder => {
    return {
      ...folder,
      opened: isSelectedFolder(folder, currentDocId)
    }
  })

  _this.$set(_this.list, 'folders', _folders)
}

/**
 * ドキュメントを設定する
 * @param {object} _this 
 * @param {object} route VueRouterのルートオブジェクト
 */
const setDocument = (_this, route) => {
  // フォルダの開閉状態を初期化
  const currentDocId = route.params.fileId
  if (!currentDocId) return

  // TODO APIでドキュメント情報を取得

  _this.$set(_this.display, 'view', {
    documentId: currentDocId,
    documentName: 'Sample', // TODO APIから取得した情報を表示
    content: '# Sample', // TODO APIから取得した情報を表示
    optionMenu: {
      visible: false
    }
  })
}

/**
 * 選択中のフォルダか否かをチェック
 * @param {object} folder フォルダオブジェクト
 * @param {string} fileId ファイルID
 */
const isSelectedFolder = (folder, fileId) => {
  // ファイルIDが一致するファイルをリストから検索
  const target = folder.files.find(file => file.fileId === fileId)

  // 一致するファイルが存在すればフォルダの状態を開いた状態に変更
  if (target) {
    return true
  }
  // 既に開閉状態が設定されていれば変更しない
  else if (folder.opened !== null) {
    // 
    return folder.opened
  }

  // 開閉状態が設定されていない場合は閉じた状態を設定
  return false
}