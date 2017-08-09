<template lang="pug">
	div(:class="[type === 'textarea' ? 'mp-textarea' : 'mp-input', size ? 'mp-input--' + size : '', {'is-labeled': labeled, 'is-disabled': disabled, 'is-circle': circled, 'is-valid': valided, 'mp-input-group': $slots.before || $slots.after, 'mp-input-before': $slots.before, 'mp-input-after': $slots.after}]")
		template(v-if="type !== 'textarea'")
			label(v-if="$slots.before && showlabeled" class='mp-before--label')
				slot(name='before')
				i(class='icon icon-close' @click='closeLabel')
			span(:class="[{'is-top': isTop}]" v-if='$slots.before && !labeled' class='mp-input-group_before')
				slot(name='before')
				em.error-msg(v-if='errorShow') {{errorMsg}}
			i(:class="['icon-' + icon, onIconClick ? 'is-clickable' : '']" v-if='icon && isShowIcon' class='icon' @click="handleIconClick" ref='input')
			input(
			:class="[{'error-vaild': errorShow}]"
			:value='currentValue'
			:autocomplete="autoComplete"
			@keyup.enter="handleIconClick"
			class='mp-inner--input'
			v-bind="$props"
			ref="Input"
			@focus='handleFocus'
			@input='handleInput'
			@blur='handleBlur')
			span(v-if='$slots.after' class='mp-input-group_after' @click="handleIconClick")
				slot(name='after')
		textarea(
			v-else
			class='mp-inner--textarea'
			v-bind='$props'
			ref='textarea'
			@focus='handleFocus')
		ul.mp-history.clearfix(v-show="isShowHistory")
			li(v-for="history, index in histories")
				span(@click="selectFunc(history)") {{history}}
				i.icon.icon-close(@click="subFunc(index)")
</template>
<script>
export default {
  name: 'mpInput',
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: [String, Number],
    rows: Number,
    cols: Number,
    maxlength: Number,
    minlength: Number,
    autoComplete: {
      type: String,
      defalut: 'off'
    },
    type: {
      type: String,
      defalut: 'input'
    },
    size: {
      type: String,
      defalut: 'defalut'
    },
    placeholder: String,
    icon: String,
    disabled: Boolean,
    circled: Boolean,
    labeled: Boolean,
    showlabeled: Boolean,
    isTop: Boolean,
    errorShow: Boolean,
    valided: Boolean,
    validateEvent: {
      type: Boolean,
      default: true
    },
    isShowIcon: {
      type: Boolean,
      default: true
    },
    isShowHistory: Boolean,
    histories: Array,
    errorMsg: {
      type: String,
      defalut: ''
    },
    defalutText: {
      type: String,
      defalut: '请输入关键词'
    },
    onIconClick: Function
  },
  watch: {
    'value' (val, oldValue) {
      this.setCurrentValue(val)
    }
  },
  created () {
  },
  methods: {
    handleIconClick (evt) {
      if (this.onIconClick) {
        this.onIconClick(evt)
      }
      this.$emit('click', [evt, this.currentValue])
    },
    handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
      this.$emit('change', value)
    },
    handleFocus (event) {
      this.$emit('focus', event)
    },
    handleBlur (evt) {
      this.$emit('blur', [evt, this.currentValue])
      // if (this.validateEvent) {
      //   this.dispatch('MpFormItem', 'Mp.form.blur', [this.currentValue])
      // }
    },
    closeLabel (evt) {
      this.$emit('closeClick', evt)
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
      // if (this.validateEvent) {
      //   this.dispatch('MpFormItem', 'Mp.form.change', [value])
      // }
    },
    selectFunc (history) {
      this.$emit('select', history)
    },
    subFunc (index) {
      this.$emit('sub', index)
    }
  }
}
</script>
<style lang="stylus">
.mp-input
	margin 10px 0
	color #23232b
	position relative
	.icon
	.mp-input-group_after
		position absolute
		width 68px
		height 105%
		border-radius 0 2px 2px 0
		right -1px
		top -1px
		background-color #ffd600
		cursor pointer
		box-shadow 0 4px 4px 0 rgba(255, 214, 0, 0.3)
		&:hover
			border-color #f0c900
			background-color #f0c900
		&:active
			border-color #e1bd00
			background-color #e1bd00
	.icon
		&:before
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
	.mp-input-group_before
		display inline-block
		margin-right 12px
		font-size 13px
		line-height 20px
		width 340px
	.is-top
		display block
		margin-bottom 8px
	.mp-history
		position absolute
		top 40px
		width 326px
		left 0
		right 0
		margin 0 auto
		box-shadow 0 2px 4px 0 rgba(35, 35, 43, 0.12)
		border 1px solid #e1e1e1
		z-index 999
		background-color #fff
		li
			position relative
			width 326px
			height 40px
			margin 0
			float left
			text-align left
			&:hover
				background-color #ededed
				.icon
					display block
			span
				display inline-block
				cursor default
				overflow hidden
				padding-left 10px
				width 280px
				line-height 40px
				height 40px
				text-overflow ellipsis
				white-space nowrap
			.icon
				display none
				font-size 12px
				text-align center
				border-radius 10px
				width 20px
				height 20px
				top 10px
				right 10px
.mp-inner--textarea
.mp-inner--input
	-webkit-appearance none
	mmp-inner--inputoz-appearance none
	appearance none
	padding 8px 12px
	height 20px
	width 302px
	line-height 20px
	font-size 13px
	border solid 1px #e1e1e1
	color #ffd600
	text-shadow 0px 0px 0px #23232b
	-webkit-text-fill-color transparent
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button
		-webkit-appearance none
	&:hover
		border-color #bababa
	&:focus
		border-color #ffd600
	&::-webkit-input-placeholder
		 text-shadow 0px 0px 0px #bababa
		 -webkit-text-fill-color initial
.mp-textarea
	margin 10px 0
	.mp-inner--textarea
		width auto
		height auto
.mp-input--big
	.mp-inner--input
		padding 10px 16px
		height 24px
		line-height 24px
		font-size 14px
.is-circle
	position relative
	width 328px
	.mp-inner--input
		border-radius 50px
	.icon
		width 28px
		height 28px
		border-radius 50%
		top 50%
		right 5px
		transform translateY(-50%)
		&:before
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
.is-valid
	.error-msg
		display inline-block
		font-weight normal
		float right
		color #ff7b4d
	.mp-inner--input
		color #ff7b4d
		text-shadow 0px 0px 0px #23232b
		-webkit-text-fill-color transparent
		&:hover
			border-color #ff7b4d
			color #ff7b4d
			text-shadow 0px 0px 0px #23232b
			-webkit-text-fill-color transparent
		&:focus
			border-color #ff7b4d
		&::-webkit-input-placeholder
			 text-shadow none
			 -webkit-text-fill-color initial
	.error-vaild
		border-color #ff7b4d
		color #ff7b4d
		text-shadow 0px 0px 0px #23232b
		-webkit-text-fill-color transparent
.is-disabled
	.mp-inner--textarea
	.mp-inner--input
		background-color #ededed
		border-color #ededed
		box-shadow none
		cursor not-allowed
		&:hover
		&:active
			background-color #ededed
			border-color #ededed
	.mp-inner--textarea
		resize none
.is-labeled
	padding 6px 4px
	border 1px solid #e1e1e1
	position relative
	display flex
	.mp-input-group_after
		text-align center
		line-height 44px
		font-size 14px
	.icon-close
		box-shadow none
	.mp-inner--input
		padding 0 68px 0 16px
		height 30px
		line-height 30px
		font-size 14px
		border 0 none
		flex 1
	.mp-history
		width 597px
		top 45px
		li
			width 597px
			span
				width 555px
	.mp-before--label
		padding 4px 12px
		height 20px
		line-height 20px
		font-size 13px
		background-color #f3f3f3
		border 1px solid #e1e1e1
		.icon
			display inline-block
			width 12px
			height 12px
			margin-left 8px
			border-radius 12px
			background-color #bababa
			color #fff
			position relative
			top 2px
		.icon-close
			&:before
				position absolute
				top 50%
				left 50%
				display inline-block
				transform translate(-49%,-48%) scale(0.5)
@keyframes rotating {
    0% {
        transform-origin: center center;
        transform:rotate(0deg);
    }
    100% {
        transform-origin: center center;
        transform:rotate(360deg);
    }
}
</style>
