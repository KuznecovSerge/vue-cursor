<template>
    <b-modal 
        class="author-ask"
        ref="ask-author" 
        title=""
        hide-backdrop 
        centered
        size="lg"
        hide-footer
        @hidden="$emit('show', false)"
    >
        <div class="author-ask__form" v-if="status == 'ready'">
            <div class="author-ask__title">Задать вопрос автору</div><br/>
            <div class="author-ask__welcome">Напишите вопрос и автор ответит на оставленную вами почту.
                <br/>
                <small class="text-muted">(Тестовый режим: сообщения будут отправлены Вам!)</small>
            </div>
            <mc-input 
                v-model="email"
                class="author-ask__email"
                label="Электронная почта" 
                placeholder="example@mail.com"
            />
            <mc-textarea 
                v-model="text"
                class="author-ask__text"
                label="Сообщение" 
                placeholder="Напишите вопрос..."
            />
            <mc-fileupload
                v-model="files"
                class="author-ask__file"
            />
            <div 
                class="author-ask__action mc-btn-orange"
                :class="text ? '' : 'disable'"
                @click="text && sendMessage()"
                >Отправить
            </div>
        </div>
        <div class="author-ask__form" v-else-if="status == 'pending'">
            <div class="author-ask__messagebox">
                <div class="author-ask__message">
                    Сообщение отправляется...
                </div>
            </div>
            <div 
                class="author-ask__action mc-btn-orange disable"
                >Закрыть
            </div>
        </div>
        <div class="author-ask__form" v-else>
            <div class="author-ask__messagebox">
                <div class="author-ask__message">
                    {{errorMsg || 'Вопрос успешно отправлен'}}
                </div>
            </div>
            <div 
                class="author-ask__action mc-btn-orange"
                @click="$emit('show', false)"
                >Закрыть
            </div>
        </div>
    </b-modal>
</template>

<script>
import McInput from '@/components/common/mc-input';
import McTextarea from '@/components/common/mc-textarea';
import McFileupload from '@/components/common/mc-fileupload';
import CommentInput from '@/components/common/comments/input';

export default {
    name: 'AuthorAsk',
    components: {
        CommentInput,
        McInput,
        McTextarea,
        McFileupload
    },
    model: {
        prop: 'visible',
        event: 'show'   
    },
    props: {
        visible: {
            default: false
        },
        authorId: Number,
    },
    data() {
        return {
            email: '',
            text: '',
            files: [],
            status: 'ready',
            errorMsg: ''
        }
    },
    watch: {
        visible(newVal, oldVal) {
            if (newVal) {
                this.$refs['ask-author'].show();
                this.email = this.currentUser.email;
                this.text = '';
                this.files = [];
                this.status = 'ready';
                this.errorMsg = '';
            } else {
                this.$refs['ask-author'].hide();
            }
            this.$emit('show', newVal);
        }
    },
    methods: {
        sendMessage() {
            const formData = new FormData();
            formData.append('emailFrom', this.email);
            formData.append('authorId', this.authorId);
            formData.append('message', this.text);
            
            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i].raw;
                formData.append(`attachments`, file);
            }

            this.$http.post('/api/users/authors/messages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }               
            }).then(({ data }) => {
                this.status = 'complete'
			}).catch(({ response }) => {
                this.errorMsg = response.data.error || response.error.message;
                this.status = 'error';
            });
            this.status = 'pending';
        }
    }
};
</script>

<style lang="less">
.author-ask {
    &__form {
        min-height: 690px;
        display: flex;
        flex-direction: column;
    }
    &__messagebox {
        flex-grow: 1;
        position: relative;
    }
    &__message {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }
    &__title {
        font-size: 40px;
        text-align: center;
    }
    &__welcome {
        text-align: center;
        margin-bottom: 71px;
    }
    &__email {
        margin-bottom: 39px;
    }
    &__text {
        margin-bottom: 39px;
    }
    &__file {
        height: 99px;
        margin-bottom: 39px;
    }
    &__action {
        width: 100%;
        margin-top: auto;
    }
}
</style>