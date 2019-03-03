import { isSingleByte } from '../../utils/validUtil'

/**
 * プロジェクト名のバリデーションを行う
 * @param {string} teamName プロジェクト名
 * @returns {boolean} 判定結果
 */
const validPjName = pjName => {
  if (pjName.length > 30) {
    return false;
  }
  return true;
};

/**
 * プロジェクトコードのバリデーションを行う
 * @param {string} pjCode プロジェクトコード
 * @returns {boolean} 判定結果
 */
const validPjCode = pjCode => {
  if (pjCode.length > 20) {
    return false;
  }
  for (var i = 0; i < pjCode.length; i++) {
    if (!isSingleByte(pjCode.charAt(i))) {
      return false;
    }
  }
  return true;
};

/**
 * プロジェクト説明のバリデーションを行う
 * @param {string} pjAbstract チーム説明
 * @returns {boolean} 判定結果
 */
const validPjAbstract = pjAbstract => {
  if (pjAbstract.length > 1000) {
    return false;
  }
  return true;
};

export default {
  validPjName,
  validPjCode,
  validPjAbstract
}