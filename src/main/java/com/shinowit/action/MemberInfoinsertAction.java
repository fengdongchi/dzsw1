package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MemberInfoinsertAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TBaMemberInfo mem;
    private List<TBaMemberInfo> list;
    @Resource
    private BaseDAO<TBaMemberInfo> dao;

    public String insert(){
        list=dao.listAll(TBaMemberInfo.class);
        for(TBaMemberInfo u:list){
            if(u.getUserName().trim().equals(mem.getUserName().trim())){
                setSuccess(true);
                setFailse(false);
                setMessage("您插入失败！");
                return SUCCESS;
            }
        }
        setMessage("插入成功！");
        setFailse(true);
        setSuccess(true);
        dao.insert(mem);
        return SUCCESS;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public TBaMemberInfo getMem() {
        return mem;
    }

    public void setMem(TBaMemberInfo mem) {
        this.mem = mem;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
