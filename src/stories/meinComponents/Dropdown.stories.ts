import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Dropdawn from '../../features/dropdawn/ui/dropdawn';
import styles from '../../features/dropdawn/ui/dropdawn.module.scss'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MeinCopmponents/Dropdawn',
  component: Dropdawn,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
   args: { onChange: fn() },
} satisfies Meta<typeof Dropdawn>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Witch_parents: Story = {
  args: {
    placeholder: "Филиал",
    autoChosen: [-1],
    list: [
        {
            id: 2,
            name: 'Филиал_1',
            parrentId: 1,
            parrentName: 'Родительский_Филиал',
            check: true
        },
        {
            id: 3,
            name: 'Филиал_2',
            parrentId: 1,
            parrentName: 'Родительский_Филиал',
            check: true
        },
        {
            id: 4,
            name: 'Филиал_3',
            parrentId: 1,
            parrentName: 'Родительский_Филиал',
            check: true
        },
        {
            id: 5,
            name: 'Компания_1',
            parrentId: 10,
            parrentName: 'Родительская_Компания',
            check: true
        },
        {
            id: 6,
            name: 'Компания_1',
            parrentId: 10,
            parrentName: 'Родительская_Компания',
            check: true
        },
        {
            id: 7,
            name: 'Компания_1',
            parrentId: 10,
            parrentName: 'Родительская_Компания',
            check: true
        }
    ],
    isChoosingAll: true,
    isChoosingAllValue: true,
  },
};

export const Witchaut_parents: Story = {
  args: {
    placeholder: "Филиал",
    autoChosen: [-1],
    list: [
        {
            id: 2,
            name: 'Филиал_1',
            check: true
        },
        {
            id: 3,
            name: 'Филиал_2',
            check: true
        },
        {
            id: 4,
            name: 'Филиал_3',
            check: true
        },
        {
            id: 5,
            name: 'Компания_1',
            check: true
        },
        {
            id: 6,
            name: 'Компания_1',
            check: true
        },
        {
            id: 7,
            name: 'Компания_1',
            check: true
        }
    ],
    isChoosingAll: true,
    isChoosingAllValue: true,
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
