import React, { useContext } from 'react';
import type { IApiComponentProps } from 'dumi/theme';
import { context, useApiData, AnchorLink } from 'dumi/theme';
import '../style/api.less';

const DataLink = {
  TimelineState: '/data#timelinestate',
  TimelineRow: '/data#timelinerow',
  TimelineAction: '/data#timelineaction',
  TimelineEffect: '/data#timelineeffect',
  ITimelineEngine: '/engine/api',
};

const keys = Object.keys(DataLink);
const reg = new RegExp(/TimelineState|TimelineAction|TimelineRow|TimelineEffect|ITimelineEngine/);

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

export default ({ identifier, export: expt }: IApiComponentProps) => {
  const data = useApiData(identifier);
  const { locale } = useContext(context);
  const texts = /^zh|cn$/i.test(locale)
    ? LOCALE_TEXTS['zh-CN']
    : LOCALE_TEXTS['en-US'];

  return (
    <>
      {data && (
        <table style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>{texts.name}</th>
              <th>{texts.description}</th>
              <th>{texts.type}</th>
              <th style={{ minWidth: 100 }}>{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {data[expt].map((row) => {
              let type = row.type || '';
              let length = 0;
              let arr = type.split(reg).join('@@').split('@');
              return (
                <tr key={row.identifier}>
                  <td>{row.identifier}</td>
                  <td>{row.description || '--'}</td>
                  <td>
                    <code>
                      {arr.map((item, index) => {
                        if (item) {
                          length += item.length;
                          return item;
                        } else {
                          const key = keys.find(
                            (key) => type.indexOf(key) === length,
                          );
                          if (key) {
                            type = type.replace(key, '');
                            return (
                              <AnchorLink key={index} to={DataLink[key]}>{key}</AnchorLink>
                            );
                          }
                        }
                      })}
                    </code>
                  </td>
                  <td>
                    <code>
                      {row.default || (row.required && texts.required) || '--'}
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
