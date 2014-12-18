package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
public class InstockdetaildeleteAction extends ActionSupport {
    private boolean success;
    private boolean failse;
    private String message;
    private String arry1;
    @Resource
    private BaseDAO<TMeInStockDetailsInfo> instockdetaildao;

    public String delete(){
        int a =0;
        String []ss=arry1.split(",");
        for(String s:ss){
            instockdetaildao.executeHQL("delete from TMeInStockDetailsInfo where id=?",Integer.valueOf(s));
            a+=1;
        }
            if(a>0){

                setFailse(true);
                setSuccess(true);
                setMessage("删除成功！");
                return SUCCESS;
            }else{
                setFailse(false);
                setMessage("删除失败！");
                setSuccess(true);
                return SUCCESS;
            }

    }

    public String getArry1() {
        return arry1;
    }

    public void setArry1(String arry1) {
        this.arry1 = arry1;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
