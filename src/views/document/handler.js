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
    if (_this.dialog.folderCreate.folderName === '') return
    _this.list.folders.push({
      folderId: '', // TODO APIの結果を使用
      folderName: _this.dialog.folderCreate.folderName,
      files: []
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
        files: []
      })
    }
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
 * フォルダの開閉状態を初期化する
 * @param {object} _this 
 * @param {object} route VueRouterのルートオブジェクト
 */
const setInitialFolderOpenStatus = (_this, route) => {
  // フォルダの開閉状態を初期化
  const currentDocId = route.params.documentId
  if (!currentDocId) return

  const _folders = _this.list.folders.map(folder => {
    return {
      ...folder,
      opened: isSelectedFolder(folder, currentDocId)
    }
  })

  _this.$set(_this.list, 'folders', _folders)
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