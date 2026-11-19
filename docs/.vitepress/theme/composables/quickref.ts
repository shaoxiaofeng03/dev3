import python from '../../../data/quickref-python.json';

export type QuickRefKind = 'pitfall' | 'outline';

export interface QuickRefItem {
  id: string;
  kind: QuickRefKind;
  /** 题干：默认展示，先让人自己回答 */
  q: string;
  /** 答案：默认收起，点开才显示。支持 `行内代码` 与 **加粗** */
  a: string;
  /** 可选的多行代码示例 */
  code?: string;
}

export interface QuickRefGroup {
  title: string;
  note?: string;
  items: QuickRefItem[];
}

export interface QuickRefTopic {
  label: string;
  source?: string;
  groups: QuickRefGroup[];
}

/**
 * 速查/复习清单的数据源。新增一个主题 = 在 docs/data 下加一个 json + 这里挂一行。
 */
export const quickrefs: Record<string, QuickRefTopic> = {
  python: python as unknown as QuickRefTopic,
};

export function quickrefOf(topic: string): QuickRefTopic | undefined {
  return quickrefs[topic];
}
